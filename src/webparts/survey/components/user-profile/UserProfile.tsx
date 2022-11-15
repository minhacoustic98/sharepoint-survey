import * as React from "react";
import { IUserProfileProps } from "../ISurveyProps";

export default class UserProfile extends React.Component<
  IUserProfileProps,
  unknown
> {
  public render(): React.ReactElement {
    const { userName, userEmail } = this.props;

    return (
      <div className="user-profile">
        <p>
          Current user name: <strong>{userName}</strong>
        </p>
        <p>
          Current user email: <strong>{userEmail}</strong>
        </p>
      </div>
    );
  }
}
