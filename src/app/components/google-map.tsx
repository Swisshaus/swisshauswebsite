'use client';

type GoogleMapProps = {
  src: string;
  height?: string;
  width?: string;
};

export default function GoogleMap({ src, height = "450px", width = "100%" }: GoogleMapProps) {
  return (
    <div className="map-container my-6">
      <iframe 
        src={src}
        width={width}
        height={height}
        style={{border: 0}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}