import React, { useEffect, useState } from "react";
import { Form } from '@formio/react';

const jsonValue = {
  "display": "form",
  "settings": {
      "pdf": {
          "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
          "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
      }
  },
  "components": [
      {
          "label": "Provideer First Name",
          "applyMaskOn": "change",
          "tableView": true,
          "defaultValue": "Sheh",
          "key": "provideerFirstName",
          "type": "textfield",
          "input": true
      },
      {
          "label": "Provider Last Name",
          "placeholder": "Provider",
          "applyMaskOn": "change",
          "tableView": true,
          "key": "providerLastName",
          "type": "textfield",
          "input": true
      },
      {
          "label": "Have phone number?",
          "tableView": false,
          "defaultValue": false,
          "key": "havePhoneNumber",
          "properties": {
              "isTrue": "true"
          },
          "logic": [
              {
                  "name": "showPhoneNumber",
                  "trigger": {
                      "type": "simple",
                      "simple": {
                          "show": true,
                          "when": "phoneNumber",
                          "eq": "123"
                      }
                  },
                  "actions": []
              }
          ],
          "type": "checkbox",
          "input": true
      },
      {
          "label": "Phone Number",
          "applyMaskOn": "change",
          "hidden": true,
          "tableView": true,
          "key": "phoneNumber",
          "conditional": {
              "show": true,
              "when": "havePhoneNumber",
              "eq": "true"
          },
          "type": "phoneNumber",
          "input": true
      },
      {
          "label": "Address",
          "tableView": false,
          "provider": "google",
          "key": "address",
          "type": "address",
          "providerOptions": {
              "params": {
                  "key": "AIzaSyC-prSIXajICEztA9bVFhwuiNJiYiEToc0",
                  "autocompleteOptions": {}
              }
          },
          "input": true,
          "components": [
              {
                  "label": "Address 1",
                  "tableView": false,
                  "key": "address1",
                  "type": "textfield",
                  "input": true,
                  "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
              },
              {
                  "label": "Address 2",
                  "tableView": false,
                  "key": "address2",
                  "type": "textfield",
                  "input": true,
                  "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
              },
              {
                  "label": "City",
                  "tableView": false,
                  "key": "city",
                  "type": "textfield",
                  "input": true,
                  "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
              },
              {
                  "label": "State",
                  "tableView": false,
                  "key": "state",
                  "type": "textfield",
                  "input": true,
                  "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
              },
              {
                  "label": "Country",
                  "tableView": false,
                  "key": "country",
                  "type": "textfield",
                  "input": true,
                  "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
              },
              {
                  "label": "Zip Code",
                  "tableView": false,
                  "key": "zip",
                  "type": "textfield",
                  "input": true,
                  "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
              }
          ]
      },
      {
          "label": "Have Fax Number?",
          "tableView": false,
          "defaultValue": false,
          "key": "haveFaxNumber",
          "conditional": {
              "show": false
          },
          "type": "checkbox",
          "input": true
      },
      {
          "label": "Fax Number",
          "applyMaskOn": "change",
          "hidden": true,
          "tableView": true,
          "key": "faxNumber",
          "customConditional": "show = !data.haveFaxNumber // <=> data.haveFaxnumber == true \n",
          "type": "phoneNumber",
          "input": true
      },
      {
          "label": "Email Address",
          "applyMaskOn": "change",
          "tableView": true,
          "errorLabel": "Your data",
          "key": "emailAddress",
          "type": "email",
          "input": true
      },
      {
          "label": "NPI#",
          "applyMaskOn": "change",
          "mask": false,
          "tableView": false,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "npi",
          "type": "number",
          "input": true
      },
      {
          "label": "Save",
          "showValidations": false,
          "theme": "secondary",
          "disableOnInvalid": true,
          "tableView": false,
          "key": "submit",
          "type": "button",
          "input": true,
          "saveOnEnter": false
      }
  ]
};

function CollectionTest(props) {
  return (
    <div className ="w-1/2 p-10">
    Demo Unit Test
    </div>
  );
}

export default CollectionTest;
