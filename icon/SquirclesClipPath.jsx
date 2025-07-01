export default function SquirclesClipPath() {
  return (
    <svg className="hidden" viewBox="0 0 1 1">
      <defs>
        {/* <clipPath id="SquircleClip" clipPathUnits="objectBoundingBox">
          <path
            d="M 0,0.5
                C 0,0  0,0  0.5,0
                  1,0  1,0  1,0.5
                  1,1  1,1  0.5,1
                  0,1  0,1  0,0.5"
          ></path>
        </clipPath> */}
        <mask
          id="squircle-mask"
          maskUnits="objectBoundingBox"
          maskContentUnits="objectBoundingBox"
        >
          <path
            fill="white"
            d="M 0,0.5
           C 0,0  0,0  0.5,0
             1,0  1,0  1,0.5
             1,1  1,1  0.5,1
             0,1  0,1  0,0.5"
          />
        </mask>
      </defs>
    </svg>
  );
}
