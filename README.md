## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Sat May 28 2022 19:14:42 GMT+0200 (Central European Summer Time)|
|**App Generator**<br>@sap/generator-fiori|
|**App Generator Version**<br>1.4.5|
|**Generation Platform**<br>Visual Studio Code|
|**Floorplan Used**<br>simple|
|**Service Type**<br>OData Url|
|**Service URL**<br>http://BackEnd-Host:50000/sap/opu/odata/SAP/ZTODOLIST_SRV/
|**Module Name**<br>todoapp|
|**Application Title**<br>SAP UI5 TODO Application|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_fiori_3|
|**UI5 Version**<br>1.102.1|
|**Enable Code Assist Libraries**<br>False|
|**Add Eslint configuration**<br>False|
|**Enable Telemetry**<br>True|

## todoapp

SAP UI5 TODO Application

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite. In order to launch the App, simply run the following comands from the app root folder:


```
    npm install
```

- To Start the FIORI App run the following command

```
    npm start
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)
2. Connect via a Back-End System (In this case i have connected via my SAP Trial System) - For this check the configuration in ui5.yaml file

```
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        ignoreCertError: false
        ui5:
          path:
            - /resources
            - /test-resources
          url: https://ui5.sap.com
          version: 1.102.1 
        backend:
          - path: /sap
            url: http://<SAP-system-host>:<50000|Your back-end port>
```