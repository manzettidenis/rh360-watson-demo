import React from 'react';
import PropTypes from 'prop-types';
import lang from 'language-list';
import { parser } from 'css-math';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Tabs, Pane } from 'watson-react-components';
import ErrorMessage from './ErrorMessage.jsx';
import { colors } from './utils/colors';
import { weight, size } from './utils/typography';
import { breakpoint } from './utils/breakpoints';
import { MAX_CONTENT_WIDTH } from './utils/variables';

const languages = lang();
let index = 0;
let currentInput;
const buttonBreakpoint = '400px';

const styles = StyleSheet.create({
  container: {
    maxWidth: parser(`${MAX_CONTENT_WIDTH} - 1rem`),
  },
  header: {
    marginTop: '6rem',
    marginBottom: '2rem',
    color: colors.PRIMARY,
    fontWeight: weight.NORMAL,
  },
  textarea: {
    border: 'none',
    borderWidth: '1px',
    padding: '0rem',
    resize: 'none',
    height: '6rem',
    ':focus': {
      border: 'none',
      outline: 'none',
    },
  },
  buttonContainer: {
    display: 'block',
    marginTop: '2rem',
    marginBottom: '3rem',
    [breakpoint(buttonBreakpoint)]: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'flex-start',
    },
  },
  button: {
    padding: '0.2em 3em',
    fontWeight: weight.NORMAL,
    width: '100%',
    marginBottom: '2rem',
    [breakpoint(buttonBreakpoint)]: {
      width: 'auto',
      margin: '0rem 1rem 0rem 0rem',
    },
    ':disabled': {
      backgroundColor: colors.LIGHT_GRAY,
      borderColor: colors.LIGHT_GRAY,
    },
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 10rem)',
    marginTop: '0rem',
  },
  footnote: {
    fontSize: size.SMALL,
  },
  language: {
    fontSize: size.SMALL,
    float: 'right',
    marginLeft: '3rem',
    fontStyle: 'italic',
  },
});

const Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    language: PropTypes.string,
    changeRequestType: PropTypes.func,
    disableButton: PropTypes.bool,
    onSubmit: PropTypes.func,
    onTabChange: PropTypes.func,
    onInputChange: PropTypes.func,
    error: PropTypes.shape({
      error: PropTypes.string,
      code: PropTypes.number,
    }),
  },

  getDefaultProps() {
    return {
      onSubmit() {},
      onTabChange() {},
      onInputChange() {},
      disableButton: false,
    };
  },

  getInitialState() {
    return {
      text: this.props.text,
      url: this.props.url,
    };
  },

  onAnalyzeClick() {
    currentInput = index === 0 ? this.state.text : this.state.url;
    this.props.onSubmit(currentInput);
  },

  render() {
    return (
      <div className={css(styles.container)}>
        <h3 className={css(styles.header)}>Examine a avaliação de um colaborador.</h3>
        <Tabs
          selected={index}
          onChange={(i) => {
            index = i;
            this.props.onTabChange.call(this);
            this.props.changeRequestType(index);
          }}
        >
          <Pane label="Text">
            {/* hack to render textarea properly */}
            <div style={{ visibility: 'hidden', margin: '0rem 0rem -1rem', height: '0rem', overflow: 'hidden' }} />
            <textarea
              className={css(styles.textarea)}
              defaultValue={this.state.text}
              rows="7"
              onChange={(e) => {
                this.setState({ text: e.target.value });
                this.props.onInputChange.call(this, e);
              }}
            />
          </Pane>
          <Pane label="URL">
            <textarea
              className={css(styles.textarea)}
              defaultValue={this.state.url}
              onChange={(e) => {
                this.setState({ url: e.target.value });
                this.props.onInputChange.call(this, e);
              }}
            />
          </Pane>
        </Tabs>
        <p
          style={{ visibility: this.props.language ? 'visible' : 'hidden' }}
          className={css(styles.language)}
        >{this.props.language ? languages.getLanguageName(this.props.language) : null}</p>
        <div className={css(styles.buttonContainer)}>
          <button
            disabled={this.props.disableButton}
            className={`base--button_fill ${css(styles.button)}`}
            onClick={this.onAnalyzeClick}
          >
              Analizar
          </button>
          {this.props.error ? <ErrorMessage error={this.props.error} /> : null}
        </div>
      </div>
    );
  },
});

export default Input;
