# keptn-provisioning-npm

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/keptn-provisioning.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/keptn-provisioning/)

Create or update projects, stages, and services Keptn. Also enabled monitoring for SLO.

#### Example

```js
import { provisioning } from "keptn-provisioning";

// If you select this section will use port-forwarding and Keptn API token will get from K8s secrets
const keptnResourcesInKubernetes = `{
  "enabled": true,
  "namespace": "keptn",
  "secret": "keptn-api-token",
  "service": "api-gateway-nginx"
}`;

// If you have public Keptn URL and `enabled = false` please fill these settings
const keptnAuth = `{
  "keptnURL": "",
  "token": ""
}`;

const config = `{
  "projects": [
    {
      "name": "test",
      "github": {
        "url": "https://github.test.com",
        "user": "github-user",
        "token": "github-pat",
        // For personal repo - "owner" is similar with "user"
        "owner": "github-organization-name",
        "repo": "github-repo-name",
        "isPrivateRepo": true,
        "isOrganization": true,
        "isEnterprise": true
      },
      "stages": [
        {
          "name": "develop"
        }
      ],
      "services": [
        {
          "name": "test",
          // Upload all files from this folder (optional)
          "workdir": "services/test",
          // Enable monitoring for SLO (optional)
          "monitoring": {
            "enabled": true,
            "type": "prometheus"
          }
        }
      ],
      "shipyardPath": "projects/test/shipyard.yaml"
    }
  ]
}`;

provisioning(config, keptnAuth, keptnResourcesInKubernetes);
```
