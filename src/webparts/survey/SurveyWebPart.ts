import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from "react-dom";

import { SPComponentLoader } from "@microsoft/sp-loader";
import * as strings from "SurveyWebPartStrings";
import { ISurveyProps } from "./components/ISurveyProps";
import Survey from "./components/Survey";
import { getSP } from "./pnpjsConfig";

export interface ISurveyWebPartProps {
  description: string;
}

export default class SurveyWebPart extends BaseClientSideWebPart<ISurveyWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<ISurveyProps> = React.createElement(
      Survey,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        userEmail: this.context.pageContext.user.email,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    SPComponentLoader.loadCss(
      "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    );
    await SPComponentLoader.loadScript(
      "https://code.jquery.com/jquery-3.2.1.slim.min.js"
    );
    await super.onInit();

    getSP(this.context);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams
      return this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentTeams
        : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost
      ? strings.AppLocalEnvironmentSharePoint
      : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
