import * as React from "react";
import { IAnsweredList } from "../ISurveyProps";
import styles from "../Survey.module.scss";

export default class AnsweredList extends React.Component<IAnsweredList> {
  public render(): React.ReactElement {
    const { owner, items } = this.props;
    return (
      <div className={styles.tableOutline}>
        <label>List anwsered by {owner}: </label>
        <table width="100%" className={styles.tableContent}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>User name</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Title}</td>
                  <td>{item.UserDisplayName}</td>
                  <td>{item.Question}</td>
                  <td>{item.Answer}</td>
                  <td>{item.Created}</td>
                  <td>{item.Modified}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
