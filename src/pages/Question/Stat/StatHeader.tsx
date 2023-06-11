import { RoutePathEnum } from '@/routes/routerEnum';
import usePageInfoState from '@/store/pageInfoState';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const { Title } = Typography;

interface IStatHeaderProps {}

const StatHeader: React.FunctionComponent<IStatHeaderProps> = (props) => {
  const nav = useNavigate();
  const { id } = useParams();
  const [pageInfoState] = usePageInfoState();
    const { title } = pageInfoState;
    const urlInputRef  =React.useRef<InputRef>(null)

    const copy = () => { 
        const ele = urlInputRef.current
        if (ele == null) return
        ele?.select()
        document.execCommand('copy')
        message.success('拷贝成功')

    }
    
    const getUrlAndQRCodeElem = () => { 
        const url = `http://localhost:3000/question/${id}`
        return <Space>
            <Input ref={urlInputRef} value={url}></Input>
            <Tooltip title='拷贝链接'>
                <Button onClick={copy} icon={ <CopyOutlined></CopyOutlined>}></Button>
            </Tooltip>
            <Popover content={<QRCode value={ url} size={150}></QRCode> }>
                <Button icon={<QrcodeOutlined></QrcodeOutlined> }></Button>
            </Popover>
        </Space>
    }
  return (
    <>
      <div className=" bg-white py-3 px-3">
        <div className="flex">
          <div className="flex-1 ">
            <Space>
              <Button type="link" onClick={() => nav(-1)} icon={<LeftOutlined></LeftOutlined>}>
                返回
              </Button>
              <h1 className="mb-0  text-lg font-bold text-black">{title}</h1>
            </Space>
          </div>
                  <div className="flex-1  text-center">{ getUrlAndQRCodeElem()}</div>
          <div className="flex-1 text-right">
            <Button type="primary" onClick={() => nav(`${RoutePathEnum.QUESTION_EDIT}${id}`)}>
              编辑
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatHeader;
