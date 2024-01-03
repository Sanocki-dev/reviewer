import { useTheme } from "@mui/material";

const Logo = ({ main, secondary, height }) => {
  const theme = useTheme();
  
  const mainColor = main || theme.palette.primary.main;

  const secondaryColor =
    secondary || (theme.palette.mode === "dark" ? "#eee" : "#282828");

  return (
    <svg
      width="19.706259mm"
      height={height}
      viewBox="0 0 19.706259 14.015151"
      version="1.1"
      id="svg5"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs2">
        <linearGradient id="linearGradient11065">
          <stop
            style={{ stopColor: "#432e0c", stopOpacity: 1 }}
            offset="0"
            id="stop11063"
          />
        </linearGradient>
      </defs>
      <g id="layer1" transform="translate(-10.047089,-75.243097)">
        <g id="rect244" style={{ opacity: 1 }}>
          <g id="g8072">
            <path
              id="rect17826-6-44"
              style={{
                opacity: 1,
                fill: "none",
                fillOpacity: 1,
                stroke: mainColor,
                strokeWidth: 1.44379,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: "none",
                strokeOpacity: 1,
                paintOrder: "fill",
              }}
              d="m 25.323358,80.054361 c -0.715158,0 -1.454461,0.552003 -1.65778,1.237651 l -0.0098,0.03307 c -0.20332,0.685647 0.208816,1.23765 0.923974,1.23765 h 2.735234 c 0.715158,0 1.454461,-0.552003 1.65778,-1.23765 l 0.0098,-0.03307 c 0.203319,-0.685648 -0.208816,-1.237651 -0.923974,-1.237651 z m -0.283704,2.740918 c -1.577285,0 -3.208931,1.217076 -3.658174,2.729033 -0.1571,0.551624 -0.209862,1.241901 0,1.677284 l 1.624066,1.332868 h 1.998449 c 1.480984,-0.04625 3.058647,-0.810162 3.657658,-2.713013 l 0.08837,-0.297139 c 0.449244,-1.511957 -0.458765,-2.729033 -2.036051,-2.729033 z"
            />
            <path
              style={{
                color: "#000000",
                fill: secondaryColor,
                fillOpacity: 1,
                strokeLinecap: "square",
              }}
              d="m 14.972949,75.249015 -1.47461,4.066406 -0.308593,0.855469 1.708984,0.619141 0.310547,-0.855469 1.039062,-2.865235 h 4.56836 l 0.03711,-0.0039 c 0,0 0.559291,-0.01875 0.994141,0.19336 0.217425,0.106055 0.381608,0.238265 0.503906,0.476562 0.122299,0.238297 0.218127,0.625239 0.125,1.300781 -0.186387,1.352046 -0.796762,1.850221 -1.400391,2.154297 -0.603628,0.304076 -1.146484,0.308594 -1.146484,0.308594 H 16.8167 l -0.666016,1.941406 4.289063,4.175781 0.125,0.123047 1.556534,1.423894 2.628701,0.0079 -2.915705,-2.736497 -0.126953,-0.121094 -3.074219,-2.996094 h 1.296875 c 0,0 0.956291,0.0041 1.964844,-0.503906 1.008553,-0.508055 2.123325,-1.632815 2.384765,-3.529297 0.130787,-0.94872 0.01414,-1.750069 -0.308593,-2.378906 -0.322731,-0.628837 -0.836314,-1.043259 -1.324219,-1.28125 -0.975809,-0.475981 -1.939453,-0.371094 -1.939453,-0.371094 l 0.07422,-0.0039 z"
              id="path3826-4-8-1-4"
            />
            <g id="g8083" style={{ display: "inline" }}>
              <path
                style={{
                  color: "#000000",
                  fill: secondaryColor,
                  fillOpacity: 1,
                  strokeWidth: 0.891052,
                  strokeLinecap: "square",
                }}
                d="m 15.495826,79.142364 -1.143332,0.484869 -1.162654,0.543796 -0.110184,0.268266 1.449291,1.425349 z"
                id="rect5941-5-3-2-1-5"
              />
              <path
                style={{
                  color: "#000000",
                  display: "none",
                  fill: "#ffffff",
                  fillOpacity: 1,
                  strokeWidth: "0.891052",
                  strokeLinecap: "square",
                }}
                d="M 19.352774,84.018744 16.8167,81.499021 c -0.197558,0.554205 -0.367964,1.118157 -0.591562,1.662554 l 0.598815,0.775379 z"
                id="rect5941-5-3-2-1-9-5"
              />
            </g>
            <path
              id="path2915-2"
              style={{
                color: "#000000",
                opacity: 1,
                fill: mainColor,
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 2.1,
                strokeLinecap: "square",
                strokeDasharray: "none",
                strokeOpacity: 1,
              }}
              d="m 10.511564,57.427963 -0.9549807,3.533634 0.093534,0.09147 11.9258877,7.581966 h 2.39882 0.01034 0.455786 c 0.768825,0.01023 1.461926,-0.22996 1.461926,-0.22996 h -0.330212 -0.01033 -3.833358 l -0.10387,-0.09457 -11.017932,-10.789006 z"
              transform="translate(0.49070454,20.622903)"
            />
            <path
              style={{
                color: "#000000",
                opacity: 1,
                fill: mainColor,
                fillOpacity: 1,
                strokeWidth: 0.891052,
                strokeLinecap: "square",
              }}
              d="M 15.171444,82.133221 11.002423,78.050637 C 10.804865,78.604841 10.047089,81.5843 10.047089,81.5843 Z"
              id="rect5941-5-3-2-1-9-6-4"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
