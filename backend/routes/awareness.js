const express = require("express");
const router = express.Router();

/*
  PURPOSE:
  - Explain noise levels
  - Increase awareness
  - NO enforcement
  - NO complaints
*/

router.get("/:db", (req, res) => {
  const db = Number(req.params.db);

  let level = "";
  let comfort = "";
  let message = "";

  if (db <= 30) {
    level = "Very Quiet";
    comfort = "Comfortable";
    message = "This noise level is peaceful and suitable for rest or focus.";
  } else if (db <= 60) {
    level = "Normal Public Noise";
    comfort = "Comfortable";
    message = "This is a typical sound level for public places.";
  } else if (db <= 75) {
    level = "Loud";
    comfort = "Mildly Stressful";
    message = "Extended exposure may feel tiring for some people.";
  } else if (db <= 90) {
    level = "Very Loud";
    comfort = "Stressful";
    message = "This level may cause stress if you stay long.";
  } else {
    level = "Extremely Loud";
    comfort = "Potentially Harmful";
    message = "Prolonged exposure at this level can affect hearing health.";
  }

  res.json({
    decibel: db,
    noiseLevel: level,
    comfortStatus: comfort,
    awarenessMessage: message
  });
});

module.exports = router;
