"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const keptn_provisioning_1 = require("keptn-provisioning");
const keptnResourcesInKubernetes = core.getInput('keptn-kube');
const keptnAuth = core.getInput('keptn-auth');
const config = core.getInput('config');
(0, keptn_provisioning_1.provisioning)(config, keptnAuth, keptnResourcesInKubernetes);
