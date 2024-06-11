exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.adminESECENTRO = (req, res) => {
  res.status(200).send("Contenido para ESE CENTRO.");
};

exports.adminCAMARACC = (req, res) => {
  res.status(200).send("Contenido para camara de comercio");
};

exports.adminCOSMITET = (req, res) => {
  res.status(200).send("Contenido para COSMITET");
};

exports.adminDUANA = (req, res) => {
  res.status(200).send("Contenido para DUANA");
};

exports.adminOZONO = (req, res) => {
  res.status(200).send("Contenido para camara de OZONO");
};

exports.adminROCHE = (req, res) => {
  res.status(200).send("Contenido para camara de ROCHE");
};