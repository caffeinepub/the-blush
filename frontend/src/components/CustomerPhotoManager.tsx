import { useState, useRef } from 'react';
import { useCustomerPhotos, useAddCustomerPhoto, useDeleteCustomerPhoto } from '../hooks/useQueries';
import { Loader2, Upload, Trash2, ImagePlus, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomerPhotoManager() {
  const { data: photos, isLoading } = useCustomerPhotos();
  const addMutation = useAddCustomerPhoto();
  const deleteMutation = useDeleteCustomerPhoto();

  const [customerName, setCustomerName] = useState('');
  const [review, setReview] = useState('');
  const [fileBytes, setFileBytes] = useState<Uint8Array<ArrayBuffer> | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (result instanceof ArrayBuffer) {
        setFileBytes(new Uint8Array(result) as Uint8Array<ArrayBuffer>);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Customer name is required');
      return;
    }
    if (!fileBytes) {
      setFormError('Please select a photo');
      return;
    }

    try {
      await addMutation.mutateAsync({
        customerName: customerName.trim(),
        photoBlob: fileBytes,
        review: review.trim(),
        onProgress: (pct) => setUploadProgress(pct),
      });
      setCustomerName('');
      setReview('');
      setFileBytes(null);
      setFileName('');
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setUploadProgress(0);
    }
  };

  const inputClass =
    'w-full font-sans text-sm bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--gold)] transition-colors duration-200';

  const labelClass =
    'block font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-muted-foreground mb-2';

  return (
    <div className="space-y-10">
      {/* Upload Form */}
      <div className="border border-border bg-card p-8">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)] mb-2">
          Add Photo
        </p>
        <h3 className="font-serif text-2xl font-light text-foreground mb-6">
          Upload Client Transformation
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Customer Name</label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={inputClass}
              disabled={addMutation.isPending}
            />
          </div>

          <div>
            <label className={labelClass}>Review</label>
            <textarea
              placeholder="Customer review or testimonial (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
              disabled={addMutation.isPending}
            />
          </div>

          <div>
            <label className={labelClass}>Photo</label>
            <div
              className="border-2 border-dashed border-border hover:border-[var(--gold)]/50 transition-colors duration-200 p-8 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={addMutation.isPending}
              />
              {fileName ? (
                <div className="flex items-center justify-center gap-2">
                  <ImagePlus size={16} strokeWidth={1.5} className="text-[var(--gold)]" />
                  <span className="font-sans text-sm text-foreground">{fileName}</span>
                </div>
              ) : (
                <div>
                  <Upload size={20} strokeWidth={1.5} className="text-muted-foreground mx-auto mb-2" />
                  <p className="font-sans text-xs text-muted-foreground">
                    Click to select a photo
                  </p>
                  <p className="font-sans text-[0.65rem] text-muted-foreground/60 mt-1">
                    JPG, PNG, WEBP supported
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {addMutation.isPending && uploadProgress > 0 && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-sans text-xs text-muted-foreground">Uploading...</span>
                <span className="font-sans text-xs text-[var(--gold)]">{uploadProgress}%</span>
              </div>
              <div className="h-1 bg-muted overflow-hidden">
                <div
                  className="h-full bg-[var(--gold)] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Error */}
          {formError && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle size={13} strokeWidth={1.5} />
              <p className="font-sans text-xs">{formError}</p>
            </div>
          )}

          {/* Mutation Error */}
          {addMutation.isError && (
            <div className="flex items-start gap-2 p-3 border border-destructive/30 bg-destructive/5">
              <AlertCircle size={13} strokeWidth={1.5} className="text-destructive mt-0.5 flex-shrink-0" />
              <p className="font-sans text-xs text-destructive">
                {addMutation.error instanceof Error
                  ? addMutation.error.message
                  : 'Upload failed. Please try again.'}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={addMutation.isPending}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase font-semibold px-8 py-3 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {addMutation.isPending ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={13} strokeWidth={1.5} />
                Upload Photo
              </>
            )}
          </button>
        </form>
      </div>

      {/* Photo Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-border">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : photos && photos.length > 0 ? (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[var(--gold)]">
              Gallery
            </p>
            <div className="flex-1 h-px bg-border" />
            <span className="font-sans text-xs text-muted-foreground">{photos.length} photos</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => {
              const isDeleting =
                deleteMutation.isPending &&
                (deleteMutation.variables as bigint) === photo.id;

              return (
                <div
                  key={String(photo.id)}
                  className="group relative border border-border overflow-hidden bg-card"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={photo.photo.getDirectURL()}
                      alt={photo.customerName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-serif text-sm font-medium text-foreground truncate">
                      {photo.customerName}
                    </p>
                    {photo.review && (
                      <p className="font-sans text-[0.65rem] text-muted-foreground truncate mt-0.5 italic">
                        {photo.review}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(photo.id)}
                    disabled={isDeleting}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-foreground/80 text-background opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive disabled:opacity-50"
                    title="Delete photo"
                  >
                    {isDeleting ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={12} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border">
          <ImagePlus size={24} strokeWidth={1.5} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-serif text-xl text-muted-foreground">No photos yet.</p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Upload the first client transformation above.
          </p>
        </div>
      )}
    </div>
  );
}
