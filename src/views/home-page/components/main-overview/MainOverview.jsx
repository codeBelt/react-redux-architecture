import * as React from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import ShowsAction from '../../../../stores/shows/ShowsAction';

const mapStateToProps = (state, ownProps) => ({
  show: state.shows.show,
});

class MainOverview extends React.Component {
  componentDidMount() {
    this.props.dispatch(ShowsAction.requestShow());
  }

  render() {
    const { show } = this.props;

    if (!show) {
      return null;
    }

    const image = oc(show).image.medium('');
    const network = oc(show).network.name('');

    return (
      <Item.Group>
        <Item>
          <Item.Image src={image} />
          <Item.Content>
            <Item.Header as="a">{show.name}</Item.Header>
            <Item.Meta>{network}</Item.Meta>
            <Item.Description>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            </Item.Description>
            <Item.Extra>{show.genres.join(' | ')}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export { MainOverview as Unconnected };
export default connect(mapStateToProps)(MainOverview);
