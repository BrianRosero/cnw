const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard,
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard,
    );

    app.get(
      "/api/test/adminESECENTRO",
      [authJwt.verifyToken, authJwt.isAdminESECENTRO],
      controller.adminESECENTRO,
    );

    app.get(
      "/api/test/adminCAMARACC",
      [authJwt.verifyToken, authJwt.isAdminCAMARACC],
      controller.adminCAMARACC,
    );

    app.get(
      "/api/test/adminCOSMITET",
      [authJwt.verifyToken, authJwt.isAdminCOSMITET],
      controller.adminCOSMITET,
    );

    app.get(
      "/api/test/adminDUANA",
      [authJwt.verifyToken, authJwt.isAdminDUANA],
      controller.adminDUANA,
    );

    app.get(
      "/api/test/adminOZONO",
      [authJwt.verifyToken, authJwt.isAdminOZONO],
      controller.adminOZONO,
    );

    app.get(
      "/api/test/adminROCHE",
      [authJwt.verifyToken, authJwt.isAdminROCHE],
      controller.adminROCHE,
    );
};
