export default function Rating({ children }) {
  let currentStarValue = Math.round(Number(children));
  const fullStar = "★";
  const emptyStar = "☆";
  let remainingStartCount = 10 - currentStarValue;
  let finalResult =
    fullStar.repeat(currentStarValue) + emptyStar.repeat(remainingStartCount);
  let color = "";
  let shadow = '';
  if (currentStarValue >= 8) {
    color = "red";
    shadow ='#e50914 1px 0 10px'
  } else if (currentStarValue > 5) {
    color = "orange";
    shadow ='#FC0 1px 0 10px' 
  } else {
    color = " #ADC1D6";
    shadow ='#FC0 1px 0 10px' 
  }

  return (
    <>
      <div className="tooltip">
        <div className="ratings" style={{ color, textShadow: shadow}}  >
          {finalResult}
        </div>
        <span className="tooltiptext">{currentStarValue}/10</span>
      </div>
    </>
  );
}
