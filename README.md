![keptn](https://github.com/keptn/keptn/raw/master/assets/keptn.png)

# Keptn Provisioning

This repository contains the GitHub Actions, which create and update [Keptn](https://keptn.sh/) projects/stages/services.

## Usage

Full flow:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: "Keptn provisioning"
        uses: Moon1706/keptn-provisioning@v1
        with:
          keptn-auth: |
            keptnURL: "keptn.test.com"
            token: "XXXXXXXXXXXXXXXXXXX"
          config: |
            projects: 
              - name: "test"
                shipyardPath: "projects/test/shipyard.yaml"
                github:
                  url: "https://github.com"
                  user: "Moon1706"
                  token: "XXXXXXXXXXXXXXXX"
                  owner: "Moon1706"
                  repo: "keptn-test"
                  isPrivateRepo: true
                  isOrganization: false
                  isEnterprise: false
                stages:
                  - name: "develop"
                services:
                  - name: "test"
                    workdir: "services/test"
                    monitoring:
                      enabled: true
                      type: "prometheus"
```

Flow without service resources for Github Enterprise:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: "Keptn provisioning"
        uses: Moon1706/keptn-provisioning@v1
        with:
          keptn-auth: |
            keptnURL: "keptn.test.com"
            token: "XXXXXXXXXXXXXXXXXXX"
          config: |
            projects: 
              - name: "test"
                shipyardPath: "projects/test/shipyard.yaml"
                github:
                  url: "https://github.test.com"
                  user: "githubuser"
                  token: "XXXXXXXXXXXXXXXX"
                  owner: "githuborg"
                  repo: "keptn-test"
                  isPrivateRepo: true
                  isOrganization: true
                  isEnterprise: true
                stages:
                  - name: "develop"
                services:
                  - name: "test"
```

Kubernetes flow:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Connection to GCP.
      # You can use your cloud or infra.
      # Main requirement, kubectl must connect to your cluster.
      - name: "Auth to GCP exist env"
        uses: google-github-actions/auth@v0
        with:
          credentials_json: ${{ secrets.GOOGLE_SERVICE_ACCOUNT }}
      - name: "Set up Cloud SDK"
        uses: google-github-actions/setup-gcloud@v0
      - name: "Connect to cluster"
        uses: google-github-actions/get-gke-credentials@v0
        with:
          cluster_name: keptn-test
          location: europe-west3-c
          project_id: keptn-test

      - name: "Keptn provisioning"
        uses: Moon1706/keptn-provisioning@v1
        with:
          keptn-kube: |
            enabled: true,
            namespace: "keptn",
            secret: "keptn-api-token",
            service: "api-gateway-nginx"
          config: |
            projects: 
              - name: "test"
                shipyardPath: "projects/test/shipyard.yaml"
                github:
                  url: "https://github.com"
                  user: "Moon1706"
                  token: "XXXXXXXXXXXXXXXX"
                  owner: "Moon1706"
                  repo: "keptn-test"
                  isPrivateRepo: true
                  isOrganization: false
                  isEnterprise: false
                stages:
                  - name: "develop"
                services:
                  - name: "test"
                    workdir: "services/test"
                    monitoring:
                      enabled: true
                      type: "prometheus"
```
