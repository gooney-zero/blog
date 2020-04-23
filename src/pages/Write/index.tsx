import React, { useState, useEffect } from 'react';
import Editor from 'for-editor';
import { Input, message, Tag, Modal, Divider, Button } from 'antd';
import './index.less';
import { Icon } from 'src/components/Icon';
import { useHistory } from 'react-router';
import { getTagsApiServe, addTagsApiServe } from 'src/data-source/tag';
import { HTTP_STATUS } from 'src/constants/common';
import { TagItem } from 'src/types/api/tag/response/getTags';
import { ReqAddTagBody } from 'src/types/api/tag/request/postTag';
import { $sync } from 'src/utils/sync';
import { isNotEmptyStr } from 'src/utils/tools';
import { addArticleServe } from 'src/data-source/article';
import { ROUTER_NAMW } from 'src/constants/route';

interface WriteState {
    value: string;
    tagList: TagItem[];
    visible: boolean;
    selectTagList: TagItem[];
    newTagValue: string;
    addTagLoading: boolean;
    tags: TagItem[];
    title: string;
    desc: string;
}

export function Write() {
    const history = useHistory();
    const [state, setState] = useState<WriteState>({
        value: '',
        tagList: [],
        visible: false,
        selectTagList: [],
        newTagValue: '',
        addTagLoading: false,
        tags: [],
        title: '',
        desc: ''
    });
    const getTags = () => {
        getTagsApiServe({}).then((res) => {
            const {
                status: { code, msg },
                data
            } = res!;
            if (code !== HTTP_STATUS.SUCCESS) {
                message.error(msg);
            } else {
                setState({
                    ...state,
                    tagList: data.tagList
                });
            }
        });
    };
    useEffect(() => {
        getTags();
    }, []);
    const $vm = React.createRef<Editor>();
    const handleChange = (value: string) => {
        console.log(value);
        setState({
            ...state,
            value
        });
    };
    const handleSave = (v: string) => {};
    const addImg = ($file: File) => {
        $vm.current!.$img2Url($file.name, 'file_url');
    };
    const showModal = () => {
        setState({
            ...state,
            visible: true
        });
    };

    const addTag = (v: TagItem) => {
        if (state.selectTagList.includes(v)) {
            message.info('已经添加过啦');
        } else {
            setState({
                ...state,
                selectTagList: [...state.selectTagList, v]
            });
        }
    };
    const newTag = () => {
        if (!state.newTagValue) {
            message.warning('请输入标签名称');
            return;
        }
        const body: ReqAddTagBody = {
            name: state.newTagValue,
            creator: '5guang',
            state: 1
        };
        $sync(async () => {
            try {
                setState({
                    ...state,
                    addTagLoading: true
                });
                const {
                    status: { code, msg }
                } = (await addTagsApiServe(body))!;
                setState({
                    ...state,
                    addTagLoading: false
                });
                if (code !== HTTP_STATUS.SUCCESS) {
                    message.error(msg);
                } else {
                    getTags();
                }
            } catch (e) {
                setState({
                    ...state,
                    addTagLoading: false
                });
            }
        });
    };
    const validate = () => {
        const { title, value, tags } = state;
        if (!isNotEmptyStr(title)) {
            message.warn('请输入标题');
            return false;
        }
        if (!isNotEmptyStr(value)) {
            message.warn('请录入内容');
            return false;
        }
        if (tags.length === 0) {
            message.warn('请至少选择一个标签');
            return false;
        }
        return true;
    };
    const publish = () => {
        const { title, desc, value, tags } = state;
        if (!validate()) return;
        const body = {
            title,
            desc,
            content: value,
            tagList: tags.map((v) => v.id),
            creator: '幻光',
            state: 1
        };
        $sync(async () => {
            const {
                status: { code, msg }
            } = (await addArticleServe(body))!;
            if (code !== HTTP_STATUS.SUCCESS) {
                message.error('发布失败');
            } else {
                message.success('发布成功').then(
                    () => history.push({ pathname: ROUTER_NAMW.POSTS }),
                    () => 0
                );
            }
        });
    };
    return (
        <section className="write">
            <header className="write-header">
                <Button onClick={() => history.goBack()}>返回</Button>
                <Button onClick={() => publish()} type="primary">
                    发布
                    <Icon type="icon-fabu" />
                </Button>
            </header>
            <section className="write-editor">
                <div style={{ margin: '20px 0' }}>
                    <div>
                        <span>标题</span>
                        <Input.TextArea
                            value={state.title}
                            onChange={(e) => setState({ ...state, title: e.target.value })}
                            className="write-editor-title"
                            style={{
                                fontSize: '20px',
                                fontWeight: 700
                            }}
                            placeholder="请输入标题"
                            rows={1}
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <span>描述</span>
                        <Input.TextArea
                            value={state.desc}
                            onChange={(e) => setState({ ...state, desc: e.target.value })}
                            className="write-editor-title"
                            placeholder="请输入描述（可不填）"
                            rows={1}
                            maxLength={100}
                        />
                    </div>
                    <section>
                        <div>标签</div>
                        <div className="write-tag">
                            {state.tags.map((v) => (
                                <Tag
                                    style={{ margin: '5px' }}
                                    color="#55acee"
                                    onClose={() =>
                                        setState({
                                            ...state,
                                            tags: state.tags.filter((tag) => tag.name !== v.name)
                                        })
                                    }
                                    closable
                                    title={v.name}
                                    key={v.id}
                                >
                                    {v.name}
                                </Tag>
                            ))}
                            <Button style={{ margin: '10px 0' }} onClick={showModal} size="small">
                                添加标签
                            </Button>
                        </div>
                    </section>
                </div>

                <Editor
                    ref={$vm}
                    onChange={(value) => handleChange(value)}
                    onSave={(v) => handleSave(v)}
                    value={state.value}
                    subfield
                    placeholder="编辑正文"
                    preview
                    toolbar={{
                        h1: true, // h1
                        h2: true, // h2
                        h3: true, // h3
                        h4: true, // h4
                        img: true, // 图片
                        link: true, // 链接
                        code: true, // 代码块
                        /* v0.0.9 */
                        undo: true, // 撤销
                        redo: true, // 重做
                        save: true, // 保存
                        /* v0.2.3 */
                        subfield: true // 单双栏模式
                    }}
                    addImg={($file) => addImg($file)}
                />
            </section>
            <Modal
                title="添加标签"
                visible={state.visible}
                onCancel={() => setState({ ...state, visible: false })}
                onOk={() => setState({ ...state, tags: state.selectTagList, visible: false })}
            >
                <div className="add-tag">
                    {/* <Input value={state.tagValue} type="text" placeholder="请输入标签" width="30%" suffix={<Icon type="icon-add"></Icon>} /> */}
                    <div
                        suppressContentEditableWarning
                        placeholder="请添加标签"
                        contentEditable="true"
                    >
                        {state.selectTagList.map((v, i) => (
                            <Tag
                                onClose={() =>
                                    setState({
                                        ...state,
                                        selectTagList: state.selectTagList.filter(
                                            (tag) => tag.name !== v.name
                                        )
                                    })
                                }
                                closable
                                title={v.name}
                                key={v.name}
                            >
                                {v.name}
                            </Tag>
                        ))}
                    </div>
                </div>
                <Divider />
                <div className="write-modal-block">
                    <p>已有标签</p>
                    {state.tagList.map((v) => (
                        <Tag
                            style={{ margin: '5px' }}
                            onClick={() => addTag(v)}
                            title={v.name}
                            key={v.id}
                        >
                            {v.name}
                        </Tag>
                    ))}
                </div>
                <div className="write-modal-block">
                    <p>新增标签</p>
                    <div style={{ width: '50%' }}>
                        <Input
                            onChange={(e) => setState({ ...state, newTagValue: e.target.value })}
                            value={state.newTagValue}
                            placeholder="请输入要添加的标签名称"
                            type="text"
                            suffix={
                                <Button
                                    onClick={() => newTag()}
                                    loading={state.addTagLoading}
                                    type="link"
                                    shape="circle"
                                    icon={
                                        <Icon style={{ cursor: 'pointer' }} type="icon-tianjia" />
                                    }
                                />
                            }
                        />
                    </div>
                </div>
            </Modal>
        </section>
    );
}
