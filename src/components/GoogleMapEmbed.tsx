export default function GoogleMapEmbed({ address }: { address: string }) {
    const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    return (
      <iframe
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        className="rounded-b-lg"
      />
    );
  }