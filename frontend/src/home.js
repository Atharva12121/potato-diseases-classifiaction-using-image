import {
    AppBar,
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@material-ui/core";
import { common } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Clear from "@material-ui/icons/Clear";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useEffect, useState } from "react";
import AK from "./Ak.jpg";
import image from "./bg.png";

// Styled button
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(common.white),
        backgroundColor: common.white,
        "&:hover": {
            backgroundColor: "#ffffff7a",
        },
    },
}))(Button);

// Styles
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    clearButton: {
        width: "100%",
        borderRadius: "15px",
        padding: "15px 22px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
    },
    mainContainer: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "93vh",
        marginTop: "8px",
    },
    imageCard: {
        margin: "auto",
        maxWidth: 400,
        height: 500,
        backgroundColor: "transparent",
        boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%)",
        borderRadius: "15px",
    },
    tableCell: {
        fontSize: "22px",
        backgroundColor: "transparent",
        color: "#000000a6",
        fontWeight: "bolder",
        padding: "1px 24px",
    },
    appbar: {
        background: "#be6a77",
        boxShadow: "none",
        color: "white",
    },
    loader: {
        color: "#be6a77 !important",
    },
}));

export const ImageUpload = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let confidence = 0;

    const sendFile = async () => {
        if (image) {
            let formData = new FormData();
            formData.append("file", selectedFile);
            let res = await axios({
                method: "post",
                url: process.env.REACT_APP_API_URL,
                data: formData,
            });
            if (res.status === 200) {
                setData(res.data);
            }
            setIsLoading(false);
        }
    };

    const clearData = () => {
        setData(null);
        setImage(false);
        setSelectedFile(null);
        setPreview(null);
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (!preview) return;
        setIsLoading(true);
        sendFile();
    }, [preview]);

    const onSelectFile = (files) => {
        if (!files || files.length === 0) {
            setSelectedFile(undefined);
            setImage(false);
            setData(undefined);
            return;
        }
        setSelectedFile(files[0]);
        setData(undefined);
        setImage(true);
    };

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        AI Power: Potato Disease Classification
                    </Typography>
                    <div className={classes.grow} />
                    <Avatar src={AK} />
                </Toolbar>
            </AppBar>

            <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
                <Grid className={classes.gridContainer} container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ""}`}>
                            {image && (
                                <CardActionArea>
                                    <CardMedia className={classes.media} image={preview} component="img" title="Uploaded Image" />
                                </CardActionArea>
                            )}
                            {!image && (
                                <CardContent className={classes.content}>
                                    <DropzoneArea
                                        acceptedFiles={["image/*"]}
                                        dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                                        onChange={onSelectFile}
                                    />
                                </CardContent>
                            )}
                            {data && (
                                <CardContent className={classes.detail}>
                                    <TableContainer component={Paper} className={classes.tableContainer}>
                                        <Table className={classes.table} size="small" aria-label="simple table">
                                            <TableHead className={classes.tableHead}>
                                                <TableRow className={classes.tableRow}>
                                                    <TableCell className={classes.tableCell}>Label:</TableCell>
                                                    <TableCell align="right" className={classes.tableCell}>
                                                        Confidence:
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className={classes.tableBody}>
                                                <TableRow className={classes.tableRow}>
                                                    <TableCell component="th" scope="row" className={classes.tableCell}>
                                                        {data.class}
                                                    </TableCell>
                                                    <TableCell align="right" className={classes.tableCell}>
                                                        {confidence}%
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            )}
                            {isLoading && (
                                <CardContent className={classes.detail}>
                                    <CircularProgress color="secondary" className={classes.loader} />
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        Processing...
                                    </Typography>
                                </CardContent>
                            )}
                        </Card>
                    </Grid>
                    {data && (
                        <Grid item className={classes.buttonGrid}>
                            <ColorButton
                                variant="contained"
                                className={classes.clearButton}
                                color="primary"
                                component="span"
                                size="large"
                                onClick={clearData}
                                startIcon={<Clear fontSize="large" />}
                            >
                                Clear
                            </ColorButton>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </React.Fragment>
    );
};
