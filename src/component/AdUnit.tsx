import { useEffect } from "react";

const AdUnit = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="w-full max-w-md">
      <ins
        className="adsbygoogle w-full"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8159870103400198"
        data-ad-slot="4503659621"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
