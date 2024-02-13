const clockAngleOffset = -90;

const handleTimes = [
  {
    id: "seconds-handle",
    toTimeValue: (time) => time.getSeconds(),
    angleDivide: 60,
  },
  {
    id: "minutes-handle",
    toTimeValue: (time) => time.getMinutes(),
    angleDivide: 60,
  },
  {
    id: "hours-handle",
    toTimeValue: (time) => time.getHours(),
    angleDivide: 12,
  },
];

//
//
//

const timeValueToAngle = (angleDivide, timeValue) => {
  const angle = (360 / angleDivide) * timeValue;
  return angle + clockAngleOffset;
};

const handleModifyAngle = (handleId) => (angle) => {
  const handleElement = document.getElementById(handleId);
  handleElement.style.transform = `rotate(${angle}deg)`;
};

const modifyTime = (time) =>
  handleTimes.map((item) =>
    handleModifyAngle(item.id)(
      timeValueToAngle(item.angleDivide, item.toTimeValue(time))
    )
  );

//
//initialize clock
//

let time = new Date();
modifyTime(time);

setInterval(() => {
  time = new Date();

  modifyTime(time);
}, 1000);
