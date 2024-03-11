const clockAngleOffset = -90;

const handleTimes = [
  {
    id: "seconds-handle",
    toTimeValue: (time) => time.getSeconds(),
    angleDivide: 60,
    handleLength: 0.8,
    color: "black",
  },
  {
    id: "minutes-handle",
    toTimeValue: (time) => time.getMinutes(),
    angleDivide: 60,
    handleLength: 0.7,
    color: "blue",
  },
  {
    id: "hours-handle",
    toTimeValue: (time) => time.getHours(),
    angleDivide: 12,
    handleLength: 0.5,
    color: "red",
  },
];

const timeValueToAngle = (angleDivide, timeValue) => {
  const angle = (360 / angleDivide) * timeValue;
  return angle + clockAngleOffset;
};

const drawClock = ({ size, id, time }) => {
  const ctx = document.getElementById(id).getContext("2d");

  const centerPoint = size / 2;

  const handles = handleTimes.map((item) => ({
    ...item,
    angle: timeValueToAngle(item.angleDivide, item.toTimeValue(time)),
  }));

  ctx.clearRect(0, 0, size, size);
  ctx.lineWidth = 5;

  handles?.map((item) => {
    const handLength = item.handleLength * (size / 2);

    const angleInRadians = item.angle * (Math.PI / 180);

    const xPos = handLength * Math.cos(angleInRadians) + centerPoint;
    const yPos = handLength * Math.sin(angleInRadians) + centerPoint;

    ctx.strokeStyle = item.color;

    ctx.beginPath();
    ctx.moveTo(centerPoint, centerPoint);
    ctx.lineTo(xPos, yPos);

    ctx.stroke();
    ctx.closePath();
  });

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.arc(centerPoint, centerPoint, (size / 2) * 0.9, 0, 2 * Math.PI);
  ctx.stroke();
};

const createClock = (size) => (id) => {
  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = size;
  canvas.height = size;

  document.body.appendChild(canvas);

  drawClock({
    size,
    id,
    time: new Date(),
  });
  setInterval(() => {
    drawClock({
      size,
      id,
      time: new Date(),
    });
  }, 1000);
};

createClock(400)("xyzCanvas");

createClock(200)("canvas");
