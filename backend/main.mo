import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import MixinStorage "blob-storage/Mixin";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import Time "mo:core/Time";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


// Specify the data migration function in the with clause

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    duration : Nat;
    price : Float;
    category : Text;
  };

  type Staff = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
  };

  type Appointment = {
    id : Nat;
    clientName : Text;
    serviceId : Nat;
    staffId : Nat;
    datetime : Time.Time;
    status : Status;
  };

  type Status = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type CustomerPhoto = {
    id : Nat;
    customerName : Text;
    photo : Storage.ExternalBlob;
    review : Text;
    timestamp : Time.Time;
  };

  var nextServiceId = 4;
  var nextStaffId = 2;
  var nextAppointmentId = 0;
  var nextPhotoId = 0;

  let services = Map.fromIter<Nat, Service>(
    [
      (
        0,
        {
          id = 0;
          name = "Haircut";
          description = "Professional haircut tailored to your style.";
          duration = 45;
          price = 35.0;
          category = "Hair";
        },
      ),
      (
        1,
        {
          id = 1;
          name = "Shaving";
          description = "Traditional shave with razor and hot towel.";
          duration = 20;
          price = 15.0;
          category = "Hair";
        },
      ),
      (
        2,
        {
          id = 2;
          name = "Coloring";
          description = "Full hair coloring with premium products.";
          duration = 90;
          price = 70.0;
          category = "Color";
        },
      ),
      (
        3,
        {
          id = 3;
          name = "Botox";
          description = "Botox treatment for hair smoothing and shine.";
          duration = 120;
          price = 120.0;
          category = "Treatment";
        },
      ),
    ].values(),
  );

  let staffMembers = Map.fromIter<Nat, Staff>(
    [
      (
        0,
        {
          id = 0;
          name = "Deepak";
          role = "Hairstylist";
          bio = "With over 10 years of transforming hair into living art, Deepak brings an unmatched blend of precision, creativity, and heartfelt care to every appointment. His hands have sculpted thousands of styles, but his true craft lies in making every client feel seen, beautiful, and confident. A passionate artist and trusted stylist, Deepak's experience ensures every haircut is a masterpiece tailored to his clients' unique personalities and needs.";
        },
      ),
      (
        1,
        {
          id = 1;
          name = "Rohit";
          role = "Hairstylist";
          bio = "Rohit is a master hairstylist with more than a decade of professional experience blending art, technique, and heartfelt care. Over the past 10+ years, his expertise in innovative coloring and transformational treatments has delivered extraordinary results for his clients. His warm personality and dedication go beyond styling; Rohit is an artist at heart who finds genuine joy seeing his clients walk out empowered, beautiful, and happy.";
        },
      ),
    ].values(),
  );

  let appointments = Map.empty<Nat, Appointment>();
  var customerPhotos : Map.Map<Nat, CustomerPhoto> = Map.empty<Nat, CustomerPhoto>();

  public query func getCustomerPhotos() : async [CustomerPhoto] {
    customerPhotos.values().toArray();
  };

  // Service Management
  public shared ({ caller }) func addService(name : Text, description : Text, duration : Nat, price : Float, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let service : Service = {
      id = nextServiceId;
      name;
      description;
      duration;
      price;
      category;
    };
    services.add(nextServiceId, service);
    nextServiceId += 1;
  };

  public query func getServices() : async [Service] {
    services.values().toArray();
  };

  public query func getServicesByCategory(category : Text) : async [Service] {
    services.values().toArray().filter(func(s) { s.category == category });
  };

  // Staff Management
  public shared ({ caller }) func addStaffMember(name : Text, role : Text, bio : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let staff : Staff = {
      id = nextStaffId;
      name;
      role;
      bio;
    };
    staffMembers.add(nextStaffId, staff);
    nextStaffId += 1;
  };

  public query func getStaffMembers() : async [Staff] {
    staffMembers.values().toArray();
  };

  // Appointment Management
  public shared ({ caller }) func bookAppointment(clientName : Text, serviceId : Nat, staffId : Nat, datetime : Time.Time) : async Nat {
    if (clientName == "") { Runtime.trap("Client name cannot be empty") };
    if (not services.containsKey(serviceId)) { Runtime.trap("Service does not exist") };
    if (not staffMembers.containsKey(staffId)) { Runtime.trap("Staff member does not exist") };

    let appointment : Appointment = {
      id = nextAppointmentId;
      clientName;
      serviceId;
      staffId;
      datetime;
      status = #pending;
    };

    appointments.add(nextAppointmentId, appointment);
    nextAppointmentId += 1;
    appointment.id;
  };

  public query ({ caller }) func getAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    appointments.values().toArray();
  };

  public shared ({ caller }) func updateAppointmentStatus(id : Nat, status : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment : Appointment = {
          id = appointment.id;
          clientName = appointment.clientName;
          serviceId = appointment.serviceId;
          staffId = appointment.staffId;
          datetime = appointment.datetime;
          status;
        };
        appointments.add(id, updatedAppointment);
      };
    };
  };

  public query ({ caller }) func getAppointment(id : Nat) : async Appointment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getPendingAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    appointments.values().toArray().filter(func(a) { a.status == #pending });
  };

  // Customer Portfolio/Gallery Management
  public shared ({ caller }) func addCustomerPhoto(customerName : Text, photo : Storage.ExternalBlob, review : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let photoEntry : CustomerPhoto = {
      id = nextPhotoId;
      customerName;
      photo;
      review;
      timestamp = Time.now();
    };
    customerPhotos.add(nextPhotoId, photoEntry);
    nextPhotoId += 1;
  };

  public shared ({ caller }) func deleteCustomerPhoto(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (customerPhotos.get(id)) {
      case (null) { Runtime.trap("Photo not found") };
      case (_existingPhoto) {
        customerPhotos.remove(id);
      };
    };
  };

  // New Methods for Customer Reviews
  public query func getCustomerPhotoReviews() : async [Text] {
    customerPhotos.values().toArray().map(func(photo) { photo.review });
  };

  public shared ({ caller }) func editCustomerPhotoReview(id : Nat, newReview : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (customerPhotos.get(id)) {
      case (null) { Runtime.trap("Photo not found") };
      case (?photo) {
        let updatedPhoto : CustomerPhoto = {
          id = photo.id;
          customerName = photo.customerName;
          photo = photo.photo;
          review = newReview;
          timestamp = Time.now();
        };
        customerPhotos.add(id, updatedPhoto);
      };
    };
  };
};
