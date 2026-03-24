import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Space,
  Tooltip,
  Modal,
  Upload,
  message,
  Pagination,
  Row,
  Col,
  Tag,
  Popconfirm,
} from 'antd';
import {
  SearchOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload';
import type { TinhTP, TinhTPSearchParams } from '../../types';
import { useTinhTP } from '../../hooks/useDanhMuc';
import { tinhTPApi } from '../../api/danhMucApi';
import styles from '../../styles/danhMuc.module.scss';

const DEFAULT_PAGE_SIZE = 10;

const TinhTPPage: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [searchParams, setSearchParams] = useState<TinhTPSearchParams>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [importModal, setImportModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TinhTP | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [importing, setImporting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data, total, isLoading, mutate } = useTinhTP(searchParams);

  // ---- Search ----
  const handleSearch = (values: { maTinh?: string; tenTinh?: string }) => {
    setSearchParams({ ...values, page: 1, pageSize: searchParams.pageSize });
  };

  const handleReset = () => {
    searchForm.resetFields();
    setSearchParams({ page: 1, pageSize: DEFAULT_PAGE_SIZE });
  };

  // ---- Pagination ----
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams((prev) => ({ ...prev, page, pageSize }));
  };

  // ---- Edit ----
  const openEdit = (record: TinhTP) => {
    setEditingRecord(record);
    editForm.setFieldsValue(record);
    setEditModal(true);
  };

  const handleSave = async () => {
    try {
      const values = await editForm.validateFields();
      setSaving(true);
      await tinhTPApi.update(editingRecord!.maTinh, values);
      message.success('Cập nhật thành công!');
      setEditModal(false);
      mutate();
    } catch (err) {
      if (err && typeof err === 'object' && 'errorFields' in err) return;
      message.error('Cập nhật thất bại. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  // ---- Delete ----
  const handleDelete = async (maTinh: string) => {
    try {
      await tinhTPApi.delete(maTinh);
      message.success('Xóa thành công!');
      mutate();
    } catch {
      message.error('Xóa thất bại. Vui lòng thử lại.');
    }
  };

  // ---- Import ----
  const handleImport = async () => {
    if (!fileList.length) {
      message.warning('Vui lòng chọn file import!');
      return;
    }
    const file = fileList[0].originFileObj as File;
    try {
      setImporting(true);
      const result = await tinhTPApi.importFile('', file);
      if (result.success) {
        message.success(result.message || 'Import thành công!');
        setImportModal(false);
        setFileList([]);
        mutate();
      } else {
        message.error(result.message || 'Import thất bại!');
        result.errors?.forEach((e) => message.error(e));
      }
    } catch {
      message.error('Import thất bại. Vui lòng thử lại.');
    } finally {
      setImporting(false);
    }
  };

  // ---- Columns ----
  const columns: ColumnsType<TinhTP> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_: unknown, __: TinhTP, index: number) =>
        ((searchParams.page ?? 1) - 1) * (searchParams.pageSize ?? 10) + index + 1,
    },
    {
      title: 'Mã Tỉnh / TP',
      dataIndex: 'maTinh',
      key: 'maTinh',
      width: 140,
      render: (val: string) => <Tag color="blue">{val}</Tag>,
    },
    {
      title: 'Tên Tỉnh / Thành phố',
      dataIndex: 'tenTinh',
      key: 'tenTinh',
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: 100,
      render: (_: unknown, record: TinhTP) => (
        <div className={styles['action-buttons']}>
          <Tooltip title="Cập nhật">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xác nhận xóa"
              description={`Bạn có chắc muốn xóa "${record.tenTinh}"?`}
              onConfirm={() => handleDelete(record.maTinh)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" size="small" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page header */}
      <div className={styles['search-section']}>
        <div className={styles['search-section__title']}>
          <SearchOutlined /> Tìm kiếm Tỉnh / Thành phố
        </div>
        <Form form={searchForm} layout="inline" onFinish={handleSearch}>
          <Row gutter={[12, 12]} style={{ width: '100%' }}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="maTinh" label="Mã Tỉnh / TP">
                <Input placeholder="Nhập mã tỉnh/TP" maxLength={6} allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="tenTinh" label="Tên Tỉnh / TP">
                <Input placeholder="Nhập tên tỉnh/TP" maxLength={250} allowClear />
              </Form.Item>
            </Col>
            <Col>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Tìm kiếm
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  Làm mới
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Table */}
      <div className={styles['table-section']}>
        <div className={styles['table-section__header']}>
          <span className={styles['table-section__title']}>
            Danh sách Tỉnh / Thành phố
            <span className={styles['table-section__total']}>
              — Tổng: <strong>{total}</strong> bản ghi
            </span>
          </span>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => setImportModal(true)}
          >
            Import file
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="maTinh"
          loading={isLoading}
          pagination={false}
          locale={{
            emptyText: (
              <div className={styles['empty-result']}>
                Không có bản ghi nào thỏa mãn điều kiện tìm kiếm
              </div>
            ),
          }}
          style={{ minHeight: 300 }}
        />

        <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', textAlign: 'right' }}>
          <Pagination
            current={searchParams.page}
            pageSize={searchParams.pageSize}
            total={total}
            showSizeChanger
            pageSizeOptions={['5', '10', '15', '20', '50', '100']}
            showTotal={(t) => `Tổng ${t} bản ghi`}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* Import Modal */}
      <Modal
        title="Import danh sách Tỉnh / Thành phố"
        open={importModal}
        onOk={handleImport}
        onCancel={() => { setImportModal(false); setFileList([]); }}
        okText="Import"
        cancelText="Hủy"
        confirmLoading={importing}
      >
        <Upload.Dragger
          accept=".xls,.xlsx,.csv"
          maxCount={1}
          fileList={fileList}
          beforeUpload={() => false}
          onChange={({ fileList: fl }) => setFileList(fl)}
        >
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">Kéo thả hoặc click để chọn file</p>
          <p className="ant-upload-hint">Định dạng hỗ trợ: .xls, .xlsx, .csv</p>
        </Upload.Dragger>
        <div className={styles['import-modal__hint']}>
          * Chỉ import khi dữ liệu hợp lệ. Hệ thống sẽ kiểm tra định dạng, dữ liệu trùng, thiếu, sai định dạng.
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Cập nhật Tỉnh / Thành phố"
        open={editModal}
        onOk={handleSave}
        onCancel={() => setEditModal(false)}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={saving}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="maTinh"
            label="Mã Tỉnh / TP"
            rules={[{ required: true, message: 'Nhập mã tỉnh/TP' }]}
          >
            <Input maxLength={6} placeholder="Tối đa 6 số" disabled />
          </Form.Item>
          <Form.Item
            name="tenTinh"
            label="Tên Tỉnh / Thành phố"
            rules={[
              { required: false },
              { max: 250, message: 'Tối đa 250 ký tự' },
              { pattern: /^\S/, message: 'Không được có ký tự trắng đầu tiên' },
            ]}
          >
            <Input maxLength={250} placeholder="Tối đa 250 ký tự, hỗ trợ tiếng Việt" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TinhTPPage;
