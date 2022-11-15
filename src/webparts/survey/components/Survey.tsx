import { spfi, SPFI } from "@pnp/sp";
import * as React from "react";
import { data } from "../assets/questions";
import { getSP } from "../pnpjsConfig";
import AnsweredList from "./answered-list/AnsweredList";
import Clock from "./clock/Clock";
import ConditionalButton from "./conditional-button/ConditionalButton";
import { AnsweredItem, IAnsweredItem, ISurveyProps } from "./ISurveyProps";
import { ISurveyState } from "./ISurveyState";
import SurveyQuestion from "./question/SurveyQuestion";
import styles from "./Survey.module.scss";
import UserProfile from "./user-profile/UserProfile";
export default class Survey extends React.Component<
  ISurveyProps,
  ISurveyState
> {
  private _sp: SPFI;
  private readonly SOURCE_NAME = "survey01";

  constructor(props: ISurveyProps) {
    super(props);

    this.state = {
      userId: null,
      answeredList: [],
      myList: [],
      isViewResponse: false,
      isDisplay: false,
      myQuestions: [],
    };

    this._sp = getSP();
  }

  async componentDidMount(): Promise<void> {
    await this._getAnsweredList();
    await this._getCurrentUser();
    const filteredList = this.state.answeredList.filter(
      (anwser) => anwser.UsernameId === this.state.userId
    );
    if (filteredList && filteredList.length > 0) {
      const updatedList = filteredList.map((obj) => {
        return { ...obj, UserDisplayName: this.props.userDisplayName };
      });
      this.setState({ isViewResponse: true, myList: updatedList });
    } else {
      this.setState({ isViewResponse: false, myQuestions: data});
      console.log(this.state.myQuestions);
    }
  }

  private _getAnsweredList = async (): Promise<void> => {
    const spCache = spfi(this._sp);

    const response: IAnsweredItem[] = await spCache.web.lists
      .getByTitle(this.SOURCE_NAME)
      .items.select(
        "Title",
        "UsernameId",
        "Question",
        "Answer",
        "Created",
        "Modified"
      )();

    const responseItem: AnsweredItem[] = response.map((item: IAnsweredItem) => {
      return new AnsweredItem(item);
    });
    this.setState({ answeredList: responseItem });
  };

  private _getCurrentUser = async (): Promise<void> => {
    const sp = spfi(this._sp);
    await sp.web
      .currentUser()
      .then((value) => this.setState({ userId: value.Id }));
  };

  public handleClick = () => {
    this.setState({ isDisplay: !this.state.isDisplay });
  };
  public render(): React.ReactElement<ISurveyProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      userEmail,
    } = this.props;

    return (
      <section
        className={`${styles.survey} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.welcome}>
          <h1>Customer online survey using SPFx</h1>
        </div>

        <UserProfile userName={userDisplayName} userEmail={userEmail} />
        <Clock />
        <ConditionalButton
          isViewResponse={this.state.isViewResponse}
          handleClick={this.handleClick}
        />
        {this.state.isViewResponse && this.state.isDisplay
         && (
          <AnsweredList
           items={this.state.myList}
            owner={userDisplayName} />
        )}

        {!this.state.isViewResponse
         && this.state.isDisplay
        && <SurveyQuestion 
        items={this.state.myQuestions}
        />}
        
      </section>
    );
  }
}
