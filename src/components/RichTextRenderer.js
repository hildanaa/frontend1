
const RichTextRenderer = ({content}) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default RichTextRenderer