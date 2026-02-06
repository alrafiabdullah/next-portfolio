import Error from "next/error";

const Custom404 = () => {
    return <>
        <Error statusCode={404} title="You are fishing in the wrong pond" />
    </>;
};

export default Custom404;
