"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
/** @type {typeof import('../../../Utils')} */
const { getAuthJwtPayload } = use("App/Utils");
/** @type {typeof import('../../../Helper/constants')} */
const { PUBLISHED } = use("App/Helper/constants");

class RecruiterTalentDestroy extends ValidationFailureHandler {
  get data() {
    this.userRoleId = getAuthJwtPayload(this.ctx.auth).user_role_id;

    return this.ctx.params;
  }

  get sanitizationRules() {
    return {
      id: "to_int",
    };
  }

  get rules() {
    return {
      id: `required|integer|existsTalent:${this.userRoleId},${PUBLISHED}`,
    };
  }

  get messages() {
    return {
      "id.existsTalent":
        "Talent not found or you don't have permission to access it",
    };
  }
}

module.exports = RecruiterTalentDestroy;
