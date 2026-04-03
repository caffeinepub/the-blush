import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type ServiceItem = {
  name: string;
  price: string;
  onRequest?: boolean;
};

type ServiceCategory = {
  title: string;
  items: ServiceItem[];
};

// ---------- MEN'S DATA ----------
const menCategories: ServiceCategory[] = [
  {
    title: "Men's Hair Cut",
    items: [
      { name: "Mens Hair Cut", price: "₹250" },
      { name: "Kids Hair Cut", price: "₹200" },
      { name: "Shaving", price: "₹150" },
      { name: "Beard Shape", price: "₹200" },
      { name: "Hair Wash", price: "₹100" },
      { name: "Basic Head Massage", price: "₹350" },
      { name: "Advance Massage", price: "₹400" },
    ],
  },
  {
    title: "Men's Hair Colour",
    items: [
      { name: "Majirel", price: "₹800" },
      { name: "Inoa", price: "₹1000" },
      { name: "Highlights Per Strip", price: "₹250" },
      { name: "Global Highlights", price: "₹1800" },
      { name: "Beard Colour", price: "₹500" },
    ],
  },
  {
    title: "Men's Treatment",
    items: [
      { name: "Keratin", price: "₹1500" },
      { name: "Nano Plastia", price: "₹2200" },
      { name: "Botox", price: "₹2000" },
      { name: "Smoothing", price: "₹2000" },
      { name: "Dandruff Treatment", price: "₹1500" },
      { name: "Hair Fall Treatment", price: "₹1200" },
    ],
  },
];

// ---------- WOMEN'S DATA ----------
const womenCategories: ServiceCategory[] = [
  {
    title: "Female Hair Cut",
    items: [
      { name: "Basic Hair Cut", price: "₹350" },
      { name: "Straight Haircut With Wash", price: "₹400" },
      { name: "U Cut Without Wash", price: "₹400" },
      { name: "U Cut With Wash", price: "₹450" },
      { name: "Just Trim", price: "₹300" },
    ],
  },
  {
    title: "Advance Female Hair Cut",
    items: [
      { name: "Layer Cut", price: "₹600" },
      { name: "Step Cut", price: "₹600" },
      { name: "Feather Cut", price: "₹700" },
      { name: "Flix Cut", price: "₹250" },
      { name: "Wings Cut", price: "₹250" },
    ],
  },
  {
    title: "Kids Female",
    items: [
      { name: "Blunt Hair Cut", price: "₹500" },
      { name: "Classic Bob", price: "₹650" },
      { name: "Bob Hair Cut", price: "₹650" },
      { name: "Straight Cut", price: "₹300" },
    ],
  },
  {
    title: "Female Styling",
    items: [
      { name: "Blow Dry Without Wash", price: "₹250" },
      { name: "Blow Dry With Wash", price: "₹400" },
      { name: "Hair Straightening One Time", price: "₹500" },
      { name: "With Wash Blast Dry", price: "₹350" },
      { name: "Hair Wash", price: "₹300" },
    ],
  },
  {
    title: "Female Treatment (Keratin)",
    items: [
      { name: "Shoulder Length", price: "₹3500" },
      { name: "Medium Length", price: "₹4500" },
      { name: "Long Length", price: "₹5500" },
    ],
  },
  {
    title: "Female Smoothening",
    items: [
      { name: "Shoulder Length", price: "₹4500" },
      { name: "Medium Length", price: "₹5500" },
      { name: "Long Length", price: "₹6000" },
    ],
  },
  {
    title: "Botox",
    items: [
      { name: "Shoulder Length", price: "₹5000" },
      { name: "Medium Length", price: "₹6000" },
      { name: "Long Length", price: "₹7000" },
    ],
  },
  {
    title: "Nano Plastia",
    items: [
      { name: "Shoulder Length", price: "₹6000" },
      { name: "Medium Length", price: "₹7000" },
      { name: "Long Length", price: "₹8500" },
    ],
  },
  {
    title: "L'Oreal Metal DX",
    items: [
      { name: "Any Length", price: "₹2000" },
      { name: "Vitamino Color Treatment", price: "₹1500" },
    ],
  },
  {
    title: "Scalp Advance",
    items: [
      { name: "Dandruff Treatment", price: "₹1800" },
      { name: "Sensitive Scalp", price: "₹1800" },
    ],
  },
  {
    title: "Female Head Massage",
    items: [
      { name: "Normal Head Massage", price: "₹400" },
      { name: "Advance Head Massage", price: "₹500" },
    ],
  },
  {
    title: "Female Hair Spa (L'Oreal)",
    items: [
      { name: "Medium Length", price: "₹1500" },
      { name: "Long Length", price: "₹1800" },
    ],
  },
  {
    title: "Female Hair Spa (Keratin)",
    items: [
      { name: "Medium Length", price: "₹1700" },
      { name: "Long Length", price: "₹2000" },
    ],
  },
  {
    title: "Female Colour Treatment",
    items: [
      { name: "Touch Up", price: "₹1500" },
      { name: "Global Colour — Shoulder Length", price: "₹3500" },
      { name: "Global Colour — Medium Length", price: "₹4000" },
      { name: "Global Colour — Long Length", price: "₹4500" },
    ],
  },
  {
    title: "Female Highlights",
    items: [
      { name: "Highlights Per Strip", price: "₹300" },
      { name: "Global Highlights", price: "₹5000" },
      { name: "Global Colour & Highlights", price: "₹7500" },
    ],
  },
  {
    title: "Highlights — Balayage",
    items: [
      { name: "Balayage", price: "₹4500" },
      { name: "French Balayage", price: "₹6000" },
      { name: "Foilyage", price: "₹5500" },
    ],
  },
  {
    title: "Make Up",
    items: [{ name: "Starting Price", price: "₹2500 – ₹10000" }],
  },
];

// ---------- SKIN & BODY DATA ----------
const skinBodyCategories: ServiceCategory[] = [
  {
    title: "Facial",
    items: [
      { name: "O3+ Facial", price: "₹2500" },
      { name: "Lotus Facial", price: "₹1500" },
      { name: "Loreal", price: "₹2000" },
      { name: "Richfeel", price: "₹1700" },
      { name: "Cheryl's", price: "₹2000" },
      { name: "O3+ D-Tan", price: "₹600" },
      { name: "Raga D-Tan", price: "₹500" },
      { name: "Cheryl's Oxyblast (With Mask)", price: "₹2000" },
      { name: "Cheryl's D-Tan (With Mask)", price: "₹2000" },
      { name: "Only Mask", price: "₹700" },
    ],
  },
  {
    title: "Clean Up",
    items: [
      { name: "Cleanup With Mask (Premium)", price: "₹1500" },
      { name: "Cleanup With Mask (Classic)", price: "₹1000" },
      { name: "Cleanup With Mask (Deluxe)", price: "₹1200" },
      { name: "Cleanup With Mask (Basic)", price: "₹900" },
      { name: "Cleanup With Mask (Signature)", price: "₹1200" },
    ],
  },
  {
    title: "Pedicure",
    items: [
      { name: "Lotus", price: "₹700" },
      { name: "D-Tan", price: "₹1000" },
      { name: "Spa Pedicure", price: "₹1500" },
      { name: "Paraffin Wax", price: "₹1700" },
    ],
  },
  {
    title: "Manicure",
    items: [
      { name: "Lotus", price: "₹500" },
      { name: "D-Tan", price: "₹800" },
      { name: "Spa Manicure", price: "₹1000" },
      { name: "Paraffin Wax", price: "₹1200" },
    ],
  },
  {
    title: "Bleach",
    items: [
      { name: "Cheryl's Face Bleach", price: "₹400" },
      { name: "O3+ Face Bleach", price: "₹600" },
      { name: "Full Body Bleach (Gents/Ladies)", price: "₹2000" },
      { name: "Hand Bleach", price: "₹600" },
      { name: "Back Bleach (Half Back)", price: "₹500" },
      { name: "Full Back Bleach", price: "₹700" },
      { name: "Only Feet", price: "₹300" },
    ],
  },
  {
    title: "Threading",
    items: [
      { name: "Eyebrow Bean Wax", price: "₹150" },
      { name: "Eyebrow", price: "₹80" },
      { name: "Upper Lips", price: "₹20" },
      { name: "Forehead", price: "₹30" },
      { name: "Lower Lips", price: "₹20" },
      { name: "Chin", price: "₹20" },
      { name: "One Side", price: "₹30" },
      { name: "Joy Line / Neck", price: "₹100" },
    ],
  },
  {
    title: "Waxing",
    items: [
      { name: "Normal Full Hand", price: "₹300" },
      { name: "Full Hand Rica", price: "₹650" },
      { name: "Rica Underarms", price: "₹200" },
      { name: "Half Leg", price: "₹300" },
      { name: "Full Leg", price: "₹600" },
      { name: "Half Leg Rica", price: "₹600" },
      { name: "Full Leg Rica", price: "₹1200" },
      { name: "Normal Underarms", price: "₹100" },
    ],
  },
  {
    title: "Bee Wax",
    items: [
      { name: "Upper Lips", price: "₹100" },
      { name: "Side Lock", price: "₹200" },
      { name: "Chin", price: "₹100" },
      { name: "Full Wax", price: "₹700" },
      { name: "Underarms", price: "₹300" },
    ],
  },
  {
    title: "Rica Wax",
    items: [
      { name: "Rica Facewax", price: "On Request", onRequest: true },
      { name: "Rica Side Lock", price: "On Request", onRequest: true },
      { name: "Rica Underarms", price: "On Request", onRequest: true },
      { name: "Lower Lips", price: "On Request", onRequest: true },
      { name: "Rica Forehead", price: "On Request", onRequest: true },
      { name: "Chin", price: "On Request", onRequest: true },
    ],
  },
  {
    title: "Bikini Wax",
    items: [
      { name: "Bikini Wax Normal", price: "₹1000" },
      { name: "Bikini Wax Rica", price: "₹1500" },
      { name: "Bikini Wax Been", price: "₹2000" },
    ],
  },
];

function CategoryAccordion({
  categories,
  tabKey,
}: {
  categories: ServiceCategory[];
  tabKey: string;
}) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {categories.map((cat, catIdx) => (
        <AccordionItem
          key={cat.title}
          value={`${tabKey}-${catIdx}`}
          className="border border-border bg-card overflow-hidden"
          data-ocid={`services.${tabKey}.item.${catIdx + 1}`}
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--cream-dark)] transition-colors group">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0" />
              <span className="font-sans text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-[var(--gold)] text-left">
                {cat.title}
              </span>
            </div>
            <span className="font-sans text-xs text-muted-foreground mr-2">
              {cat.items.length} services
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-0">
            <div className="divide-y divide-border">
              {cat.items.map((item, idx) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between px-5 py-3 ${
                    idx % 2 === 0
                      ? "bg-background"
                      : "bg-[var(--cream-dark)]/40"
                  }`}
                >
                  <span className="font-sans text-sm text-foreground leading-snug pr-4">
                    {item.name}
                  </span>
                  <span
                    className={`font-sans text-sm font-semibold flex-shrink-0 ${
                      item.onRequest
                        ? "text-muted-foreground italic"
                        : "text-[var(--gold)]"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function Services() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-24 px-6 bg-foreground text-background text-center">
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase font-semibold text-[var(--gold-light)] mb-4">
          Full Price List
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-6">
          Our Services
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
          <div className="w-1 h-1 rounded-full bg-[var(--gold-light)]" />
          <div className="h-px w-12 bg-[var(--gold-light)]/40" />
        </div>
        <p className="font-sans text-sm text-white/60 max-w-md mx-auto leading-relaxed">
          Every treatment, every price — transparent and comprehensive.
          Experience luxury without surprises.
        </p>
      </section>

      {/* Pricing Tabs */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="men" data-ocid="services.tab">
            <TabsList className="w-full mb-10 bg-[var(--cream-dark)] border border-border p-1 rounded-none h-auto">
              <TabsTrigger
                value="men"
                className="flex-1 font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold py-3 rounded-none data-[state=active]:bg-[var(--gold)] data-[state=active]:text-white data-[state=active]:shadow-none transition-all"
                data-ocid="services.men.tab"
              >
                For Him
              </TabsTrigger>
              <TabsTrigger
                value="women"
                className="flex-1 font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold py-3 rounded-none data-[state=active]:bg-[var(--gold)] data-[state=active]:text-white data-[state=active]:shadow-none transition-all"
                data-ocid="services.women.tab"
              >
                For Her
              </TabsTrigger>
              <TabsTrigger
                value="skin"
                className="flex-1 font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold py-3 rounded-none data-[state=active]:bg-[var(--gold)] data-[state=active]:text-white data-[state=active]:shadow-none transition-all"
                data-ocid="services.skin.tab"
              >
                Skin &amp; Body
              </TabsTrigger>
            </TabsList>

            <TabsContent value="men" data-ocid="services.men.panel">
              <div className="mb-6">
                <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase font-semibold text-muted-foreground mb-1">
                  Men's Services
                </p>
                <div className="h-px bg-[var(--gold)]/30" />
              </div>
              <CategoryAccordion categories={menCategories} tabKey="men" />
            </TabsContent>

            <TabsContent value="women" data-ocid="services.women.panel">
              <div className="mb-6">
                <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase font-semibold text-muted-foreground mb-1">
                  Women's Services
                </p>
                <div className="h-px bg-[var(--gold)]/30" />
              </div>
              <CategoryAccordion categories={womenCategories} tabKey="women" />
            </TabsContent>

            <TabsContent value="skin" data-ocid="services.skin.panel">
              <div className="mb-6">
                <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase font-semibold text-muted-foreground mb-1">
                  Skin & Body Treatments
                </p>
                <div className="h-px bg-[var(--gold)]/30" />
              </div>
              <CategoryAccordion
                categories={skinBodyCategories}
                tabKey="skin"
              />
            </TabsContent>
          </Tabs>

          {/* Note */}
          <p className="mt-8 text-center font-sans text-xs text-muted-foreground">
            All prices are inclusive of taxes. Prices may vary based on hair
            length and complexity.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--cream-dark)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-light text-foreground mb-4">
            Ready to Transform?
          </h2>
          <div className="h-px w-10 bg-[var(--gold)] mx-auto mb-6" />
          <p className="font-sans text-sm text-muted-foreground mb-8 leading-relaxed">
            Book your appointment today and experience the artistry of The
            Blush.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
            data-ocid="services.book.primary_button"
          >
            Book Now <ChevronRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
