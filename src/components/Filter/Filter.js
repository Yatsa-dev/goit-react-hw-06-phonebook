import { connect } from 'react-redux';
import contactsActions from '../../redux/actions';
import s from './Filter.module.css';
import PropTypes from 'prop-types';

function Filter({ value, onChange }) {
  return (
    <label>
      <p className={s.text}>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}
const mapStateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(contactsActions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
