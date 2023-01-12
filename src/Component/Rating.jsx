export default function Rating({ children }) {
  let currentStarValue = Math.round(Number(children));
  const fullStar = "★";
  const emptyStar = "☆";
  let remainingStartCount = 10 - currentStarValue;
  let finalResult =
    fullStar.repeat(currentStarValue) + emptyStar.repeat(remainingStartCount);
  let color = "";
  if (currentStarValue > 8) {
    color = "red";
  } else if (currentStarValue > 5) {
    color = "orange";
  } else {
    color = " #ADC1D6";
  }

  return (
    <>
      <div className="tooltip">
        <div className="ratings" style={{ color }} >
          {finalResult}
        </div>
        <span className="tooltiptext">{currentStarValue}/10</span>
      </div>
    </>
  );
}
