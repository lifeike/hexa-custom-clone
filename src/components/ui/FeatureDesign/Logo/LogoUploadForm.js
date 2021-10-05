import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components/macro';
import { withRouter } from 'react-router-dom';
import createInitialInputState from '@/utils/input';
import { createLogo } from '@/store/actions/logo';

import { Breadcrumb } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import { OptionsTitle, Chevron } from '../FeatureDesignStyles';
import Radio from '@/components/ui/Inputs/RadioInput';
import { Secondary } from '@/components/ui/Buttons/Buttons';
import { LogoUpload } from './LogoUpload';
import { TextInputManaged as TextInput } from '@/components/ui/Inputs/TextInput';
import { LogoAddCta, FileReadSuccess, FileReadError } from './LogoUploadCtas';
import queryString from 'query-string';
import Icon from '@/components/ui/Icons/Icon';
import ErrorModal from '@/components/ui/Modal/ErrorModal';
import { encodeFilename } from '@/utils/helpers';

const LogoUploadContainer = styled.div`
  background-color: ${props => props.theme.color_white};
  height: 100%;
  overflow: auto;
  position: absolute;
  transform: translateX(${props => props.visible ? '0' : '100%'});
  transition: all .4s ${props => props.theme.ease_out_quad};
  width: 100%;
  z-index: 10;
`;

const LogoGuideText = styled.span`
  color: ${props => props.theme.color_darkest};
  font-size: 1.9rem;
  line-height: 1.47;

  a {
    color: ${props => props.theme.color_darkest};
    text-decoration: underline;

    &:hover,
    &:visited {
      color: ${props => props.theme.color_darkest};
    }
  }
`;

const RadioSubscript = styled.div`
  color: ${props => props.theme.color_darkest};
  font-size: 11px;
  line-height: 1.57;
  margin-left: 3rem;
  opacity: 0.7;
`;

const DropzoneSubscript = styled.div`
  color: ${props => props.theme.color_grey_dark_1};
  font-size: 1.1rem;
  line-height: 1.27;
  opacity: 0.7;
`;

const FileContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const FileName = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;
  line-height: 1.2;
  overflow: hidden;
  padding-right: 2rem;
  text-overflow: ellipsis;
  text-transform: lowercase;
`;

class LogoUploadForm extends Component {
  constructor(props) {
    super(props);

    const values = queryString.parse(props.location.search);
    // Don't know the conditions where FileReader will error, so let's force it.

    this.state = {
      file: '',
      fileName: '',
      fileError: false,
      formIsValid: false,
      formIsActive: false,
      uploadError: false,
      forceError: values.forceError === 'true',
      formInputs: {
        logoName: createInitialInputState(this, {
          name: 'logoName',
          label: 'Logo Name',
          validationRules: {
            'required': true,
          },
          value: '',
          labelStyle: '600',
        }),
      },
    };
  }

  getDropZoneContent() {
    const { fileError, file } = this.state;

    if (fileError) {
      return FileReadError({
        theme: this.props.theme,
        handleClick: e => this.resetDropzone(e),
        errorMessage: fileError,
      });
    }

    if (file) {
      return FileReadSuccess();
    }

    return LogoAddCta();
  }

  resetDropzone(e) {
    e && e.preventDefault();
    e && e.stopPropagation();

    this.setState({
      fileError: false,
      file: '',
      fileName: '',
    });
  }

  confirmUploadError() {
    this.setState({
      uploadError: false,
    });

    this.resetDropzone();
  }

  onFileLoaded(file, fileName) {
    this.setState({
      file: file,
      fileName: fileName,
    });
  }

  onFileError(type) {
    this.setState({
      fileError: type,
    });
  }

  isButtonEnabled() {
    const {
      formIsValid,
      formInputs: { logoName },
      file,
    } = this.state;

    return file && formIsValid && logoName.value;
  }

  handleKeyPress(e) {
    if (!e || e.key !== "Enter") return;

    if (this.isButtonEnabled()) {
      this.handleSubmit(e);
    }
    else {
      e && e.preventDefault();
      e && e.stopPropagation();
    }
  }

  validate() {
  }

  handleSubmit(e) {
    e && e.preventDefault();
    e && e.stopPropagation();

    if (this.state.forceError) {
      this.setState({
        uploadError: true,
      });

      return;
    }

    this.props.createLogo(encodeFilename(this.state.formInputs.logoName.value), this.form.querySelector('input[name="labtype"]:checked').value, this.state.file).then(logo => {
      this.resetDropzone();
      this.form.logoName.value = '';
      this.setState({
        formInputs: {
          logoName: {
            ...this.state.formInputs.logoName,
            value: '',
          },
        },
      }, () => {
        this.props.onLogoAdded(logo);
      });
      // this.props.handleDrawerBackClick();
    }).catch(() => {
      this.setState({
        uploadError: true,
      });
    });
  }

  preventSpecialCharacter(e) {
    const regex = new RegExp('^[a-zA-Z0-9_ -]+$');
    const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

    if (!regex.test(key)) {
      e.preventDefault();

      return false;
    }
  }

  renderUploadSubscript() {
    const { fileName } = this.state;

    if (fileName) {
      return (
        <FileContainer>
          <FileName>{fileName}</FileName>
          <button onClick={e => this.resetDropzone(e)}>
            <Icon name="trash" size={24}></Icon>
          </button>
        </FileContainer>
      );
    }

    return (
      <DropzoneSubscript>Accepts .ai file types</DropzoneSubscript>
    );
  }

  render() {
    const { visible, handleDrawerBackClick } = this.props;

    const {
      forceError,
      formInputs: { logoName },
      file,
      fileError,
      uploadError,
    } = this.state;

    return (
      <LogoUploadContainer
        visible={visible}
      >
        {visible &&
          <>
            <form ref={form => this.form = form} onKeyDown={e => this.handleKeyPress(e)}>
              <Box classes="sides2">
                <Box classes="top2">
                  <Breadcrumb onClick={e => handleDrawerBackClick()} tabIndex="0">
                    <Chevron size={24} name="chevron"/>
                    Back
                  </Breadcrumb>
                </Box>
                <Box classes="top2">
                  <OptionsTitle>
                    Add Logo
                  </OptionsTitle>
                </Box>
                <Box classes="top2">
                  <LogoGuideText>
                    Review our&nbsp;
                    <a
                      href="https://hexacustompromo.com/-artwork-guidelines"
                      target="_blank"
                      rel="noopener noreferrer"
                    >logo guide</a> for asset details.
                  </LogoGuideText>
                </Box>
                <Box classes="top3">
                  <Radio
                    id="order"
                    name="labtype"
                    label="Store in Order Library"
                    value="2"
                    defaultChecked={true}
                  />
                  <RadioSubscript>Only visible on this order</RadioSubscript>
                </Box>
                <Box classes="top3">
                  <Radio
                    id="company"
                    name="labtype"
                    label="Store in Company Library"
                    value="3"
                  />
                  <RadioSubscript>Can be used by anyone in your company</RadioSubscript>
                </Box>
                <Box classes="top3">
                  <LogoUpload
                    onFileError={type => this.onFileError(type)}
                    onFileLoaded={(file, fileName) => this.onFileLoaded(file, fileName)}
                    innerContent={() => this.getDropZoneContent()}
                    forceError={forceError}
                    disabled={(file || fileError) ? true : false}
                    acceptableMimeTypes="application/postscript"
                    acceptableFileExtensions=".ai"
                  />
                </Box>
                <Box classes="top1">
                  {this.renderUploadSubscript()}
                </Box>
                <Box classes="top4">
                  <TextInput {...logoName} onKeyPress={e => this.preventSpecialCharacter(e)}/>
                </Box>
                <Box classes="top4 textRight">
                  <Secondary
                    disabled={!this.isButtonEnabled()}
                    onClick={(e) => this.handleSubmit(e)}
                  >
                  Save
                  </Secondary>
                </Box>
              </Box>
            </form>
            {uploadError &&
              <ErrorModal
                isOpen={uploadError}
                header={uploadError ? 'An error occured.' : ''}
                copy={uploadError ? 'We were unable to upload your artwork. Please try again.' : ''}
                onAfterClose={() => this.confirmUploadError()}>
              </ErrorModal>
            }
          </>
        }
      </LogoUploadContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createLogo: (name, labtype, file) => dispatch(createLogo(name, labtype, file)),
});

export default withTheme(withRouter(connect(null, mapDispatchToProps)(LogoUploadForm)));
