import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import {connect} from 'react-redux';
import { createDispatchHandler } from '../../actions/index';
import { ActionHandler } from '../../actions/redux-action';
import {RELATED_VIEWS_HIDE_TOGGLE, RelatedViewsAction} from '../../actions/related-views';
import {State} from '../../models/index';
import { RelatedViews } from '../../models/related-views';
import {selectRelatedViews} from '../../selectors/index';
import * as styles from './related-views.scss';


export interface RelatedViewsButtonProps extends ActionHandler<RelatedViewsAction> {
  relatedViews: RelatedViews;
}

// not sure if any state is needed for this button
export interface RelatedViewsButtonState {
  isHidden: boolean;
}

export class RelatedViewsButtonBase extends React.PureComponent<RelatedViewsButtonProps, RelatedViewsButtonState> {
  constructor(props: RelatedViewsButtonProps) {
    super(props);

    this.state = {
      isHidden: false
    };

    this.onHideClick = this.onHideClick.bind(this);
  }

  public render() {
    return (
      <button
        onClick={this.onHideClick}>
        {this.state.isHidden ? 'Show' : 'Hide'}
      </button>
    );
  }

  private onHideClick() {
    // not sure if setting state is needed
    this.setState({ isHidden: !this.state.isHidden });
    this.props.handleAction({
      type: RELATED_VIEWS_HIDE_TOGGLE
    });
  }

}

export const RelatedViewsButton = connect(
  (state: State) => {
    return {
      relatedViews: selectRelatedViews(state)
    };
  },
  createDispatchHandler<RelatedViewsAction>()
)(CSSModules(RelatedViewsButtonBase, styles));
