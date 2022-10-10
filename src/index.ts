import * as core from '@actions/core';
import { provisioning } from 'keptn-provisioning';

const keptnResourcesInKubernetes = core.getInput('keptn-kube');
const keptnAuth = core.getInput('keptn-auth');
const config = core.getInput('config');
provisioning(config, keptnAuth, keptnResourcesInKubernetes);
