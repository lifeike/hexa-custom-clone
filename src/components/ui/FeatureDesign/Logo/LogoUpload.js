import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import { FILE_ERRORS } from '@/utils/constants/constants';

const getBorderColor = props => {
  if (props.isDragAccept) {
    return props.theme.color_green_2;
  }
  if (props.isDragReject) {
    return props.theme.color_red_1;
  }
  if (props.isDragActive) {
    return props.theme.color_focus;
  }

  return props.theme.color_grey_5;
};

const getBackgroundColor = props => {
  if (props.isDragAccept) {
    return props.theme.color_green_3;
  }
  if (props.isDragReject) {
    return props.theme.color_red_error2;
  }

  return props.theme.color_grey_1;
};

const Container = styled.div`
  align-items: center;
  background-color: ${props => getBackgroundColor(props)};
  color: ${props => props.theme.color_darkest};
  cursor: pointer;
  border: ${props => props.disabled ? 'solid 0.1rem' : 'dashed 0.2rem'} ${props => getBorderColor(props)};
  box-shadow: ${props => props.isDragActive ? 'box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.19)': 'none' };
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 197px;
  justify-content: center;
  outline: none;
  padding: 20px;
  text-align: center;
  transition: all .24s ease-in-out;
  width: 100%;
`;

const DropHere = styled.div`
  color: ${props => props.theme.color_grey_dark};
  font-size: 1.5rem;
  font-weight: ${props => props.theme.font_weight_bold};
`;

const DropCta = () => {
  return (
    <DropHere>Drop File Here</DropHere>
  );
};

export const LogoUpload = props => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: props.acceptableMimeTypes,
    disabled: props.disabled,
    multiple: false,
    onDrop: useCallback(acceptedFiles => {
      if (!acceptedFiles || !acceptedFiles.length > 0) return;

      const file = acceptedFiles[0];

      if (props.acceptableFileExtensions.toLowerCase().includes(file.path.split('.').pop().toLowerCase())) {
        props.onFileLoaded(acceptedFiles[0], acceptedFiles[0].path);
      }
      else {
        props.onFileError(FILE_ERRORS.TYPE);
      }

    }, [props]),
  });

  return (
    <div className="container">
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})} disabled={props.disabled}>
        <input {...getInputProps()} />
        {isDragActive ? DropCta() : props.innerContent()}
      </Container>
    </div>
  );
};

LogoUpload.propTypes = {
  onFileError: PropTypes.func.isRequired,
  onFileLoaded: PropTypes.func.isRequired,
  innerContent: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  acceptableFileExtensions: PropTypes.string,
  acceptableMimeTypes: PropTypes.string,
};
