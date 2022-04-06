import { useEffect, useState } from 'react';
import { history, useRouteMatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input, Button, message } from 'antd';
import BraftEditor from 'braft-editor';
import { create, getInfo, update } from '@/services/ant-design-pro/article';
import 'braft-editor/dist/index.css';
const Edit = () => {
  const { path, params } = useRouteMatch<{ id: string }>();
  const isEdit = path === '/article/edit/:id';
  if (isEdit) {
    if (!params.id) {
      message.error('非法操作，请正确使用该系统！');
      history.goBack();
      return;
    }
    useEffect(() => {
      // 初始化文章详情
      const getArticleInfo = async () => {
        const { code, data } = await getInfo({ id: Number(params.id) });
        if (code === 200) {
          setTitle(data?.title as string);
          setEditorState(BraftEditor.createEditorState(data?.content));
        }
      };
      getArticleInfo();
    }, []);
  }
  // 富文本初始化
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p></p>'));
  // 文章标题
  const [title, setTitle] = useState('');
  // 文章具体内容
  const [content, setContent] = useState('');
  // 保存富文本内容
  const handleEditorChange = (_editorState: BraftEditor) => {
    setEditorState(_editorState);
    setContent(editorState.toHTML());
  };
  // 上传媒体资源
  const uploadFile = (params: any) => {
    console.log(params);
  };
  // 发表文章
  const submitArticle = async () => {
    if (title === '') {
      message.error('请输入文章标题');
      return;
    }
    if (isEdit) {
      const { code } = await update({ id: Number(params.id), title, content });
      if (code === 200) {
        message.success('文章编辑成功');
        history.goBack();
      }
    } else {
      const { code } = await create({ title, content });
      if (code === 200) {
        message.success('文章发表成功');
        history.goBack();
      }
    }
  };
  return (
    <PageContainer>
      <Card
        extra={
          <Button type="primary" onClick={submitArticle}>
            发表文章
          </Button>
        }
        headStyle={{ borderBottom: 'none' }}
      >
        <Input
          placeholder="请输入文章标题"
          value={title}
          onChange={(e) => {
            setTitle(e?.target?.value);
          }}
        />
        <BraftEditor
          media={{ accepts: { video: '.mp4' }, uploadFn: uploadFile }}
          value={editorState}
          onChange={handleEditorChange}
        />
      </Card>
    </PageContainer>
  );
};

export default Edit;
