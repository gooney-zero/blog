import React, { useState, useEffect, Props } from "react";
import Editor from 'for-editor';
import { Input, message, Tag, Modal, Divider } from 'antd';
import "./index.less";
import { Icon } from "src/components/Icon";
import { Button } from "antd";
import { useHistory } from "react-router";
import { getTagsApiServe } from "src/data-source/tag";
import { HTTP_STATUS } from "src/constants/common";
import { TagItem } from "src/types/api/tag/response/getTags";

interface WriteState {
  value: string
  tagList: TagItem[]
  visible: boolean
  selectTagList: string[],
}
export function Write() {
  const history = useHistory()
  const [state, setState] = useState<WriteState>({
    value: '',
    tagList: [],
    visible: false,
    selectTagList: [],
  })
  useEffect(() => {
    getTagsApiServe({}).then(res => {
      const { status: { code, msg }, data } = res!;
      if (code !== HTTP_STATUS.SUCCESS) {
        message.error(msg)
      } else {
        setState({
          ...state,
          tagList: data.tagList,
        })
      }
    })
  }, [])
  const $vm = React.createRef<Editor>()
  const handleChange = (value: string) => {
    console.log(value)
    setState({
      ...state,
      value
    })
  }
  const handleSave = (v: string) => {

  }
  const addImg = ($file: File) => {
    $vm.current!.$img2Url($file.name, "file_url")
  }
  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const addTag = (v: string) => {
    if (state.selectTagList.includes(v)) {
      message.info("已经添加过啦")
    } else {
      setState({
        ...state,
        selectTagList: [...state.selectTagList, v]
      })
    }
  }


  return (
    <section className="write">
      <header className="write-header">
        <Button onClick={() => history.goBack()}>返回</Button>
        <Button type="primary">发布<Icon type="icon-fabu" /></Button>
      </header>
      <section className="write-editor">
        <div style={{ margin: "20px 0" }}>
          <div>
            <span>标题</span>
            <Input.TextArea className="write-editor-title" style={{
              fontSize: '20px',
              fontWeight: 700
            }} placeholder="请输入标题"
              rows={1}
              maxLength={50} />
          </div>
          <div>
            <span>描述</span>
            <Input.TextArea className="write-editor-title" placeholder="请输入描述（可不填）"
              rows={1}
              maxLength={100} />
          </div>
          <section>
            <div>
              标签
          </div>
            <div>

              <Button onClick={showModal} size="small">添加标签</Button>
            </div>
          </section>
        </div>

        <Editor
          ref={$vm}
          onSave={v => handleSave(v)}
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
            subfield: true, // 单双栏模式
          }}
          addImg={($file) => addImg($file)}
          onChange={(v) => handleChange(v)} />

      </section>
      <Modal
        title="添加标签"
        visible={state.visible}
        onCancel={() => setState({ ...state, visible: false })}
      >
        <div className="add-tag">
          {/* <Input value={state.tagValue} type="text" placeholder="请输入标签" width="30%" suffix={<Icon type="icon-add"></Icon>} /> */}
          <div suppressContentEditableWarning placeholder="请添加标签" contentEditable="true">{
            state.selectTagList.map((v, i) => <Tag onClose={() => setState({ ...state, selectTagList: state.selectTagList.filter(tag => tag !== v) })} closable title={v} color={'#' + Math.random().toString(16).substr(-6)} key={v}>{v}</Tag>)
          }</div>
        </div>
        <Divider />
        <div className="write-modal-block">
          <p>已有标签</p>
          {state.tagList.map(v => (
            <Tag onClick={() => addTag(v.name)} title={v.name} key={v.id}>{v.name}</Tag>
          ))}
        </div>
        <div className="write-modal-block">
          <p>新增标签</p>
          <div style={{ width: "50%" }}><Input placeholder="请输入要添加的标签名称" type="text" suffix={<Icon type="icon-tianjia" />} /></div>
        </div>
      </Modal>
    </section>
  )
}