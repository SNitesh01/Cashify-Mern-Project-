import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Cropper from 'react-easy-crop';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { getCroppedImg } from "../../common/cropper";

const styles = {
    root: {
        width: 400,
        height: 500,
        paddingBottom: 25,
        position: 'relative'
    },
    paper: {
        borderRadius: 20,
        textAlign: 'center'
    },
    action: {
        justifyContent: 'center',
        padding: 10
    }
}

class CustomCropper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 4,
            croppedAreaPixels: null,
            finalImage: null
        }
    }

    onCropChange = crop => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        const { image } = this.props
        this.setState({
            croppedAreaPixels
        }, async () => {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0)
            this.setState({
                finalImage: croppedImage
            })
        })
    }

    onZoomChange = zoom => {
        this.setState({ zoom })
    }

    cropImage = () => {
        const { finalImage } = this.state
        const { handleCaptureDialog } = this.props
        handleCaptureDialog(finalImage)
    }

    render() {
        const { classes, open, onClose, image } = this.props

        return (
            <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
                <DialogContent classes={{ root: classes.root }}>
                    <Cropper
                        image={image}
                        crop={this.state.crop}
                        zoom={this.state.zoom}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
                        onZoomChange={this.onZoomChange}
                    />
                </DialogContent>
                <DialogActions className={classes.action}>
                    <Button variant="contained" color="secondary" size="small"
                        onClick={this.cropImage}>Crop</Button>
                    <Button variant="contained" size="small"
                            onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(CustomCropper)