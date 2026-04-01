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
  Select,
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
import type { Ward, WardSearchParams } from '../../types';
import { useWard, useProvinceAll } from '../../hooks/useCatalog';
import { wardApi } from '../../api/catalogApi';
import styles from '../../styles/catalog.module.scss';

const DEFAULT_PAGE_SIZE = 10;

const WardPage: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [importForm] = Form.useForm();

  const [searchParams, setSearchParams] = useState<WardSearchParams>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [importModal, setImportModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Ward | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [importing, setImporting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data, total, isLoading, mutate } = useWard(searchParams);
  const { provinceList } = useProvinceAll();

  const provinceOptions = provinceList.map((province) => ({
    value: province.provinceCode,
    label: province.provinceName,
  }));

  // ---- Search ----
  const handleSearch = (values: { wardCode?: string; wardName?: string }) => {
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
  const openEdit = (record: Ward) => {
    setEditingRecord(record);
    editForm.setFieldsValue(record);
    setEditModal(true);
  };

  const handleSave = async () => {
    try {
      const values = await editForm.validateFields();
      setSaving(true);
      await wardApi.update(editingRecord!.wardCode, values);
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
  const handleDelete = async (wardCode: string) => {
    try {
      await wardApi.delete(wardCode);
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
    try {
      const { provinceCode } = await importForm.validateFields();
      const file = fileList[0].originFileObj as File;
      setImporting(true);
      const result = await wardApi.importFile(provinceCode, file);
      if (result.success) {
        message.success(result.message || 'Import thành công!');
        setImportModal(false);
        setFileList([]);
        importForm.resetFields();
        mutate();
      } else {
        message.error(result.message || 'Import thất bại!');
        result.errors?.forEach((e) => message.error(e));
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'errorFields' in err) return;
      message.error('Import thất bại. Vui lòng thử lại.');
    } finally {
      setImporting(false);
    }
  };

  // ---- Columns ----
  const columns: ColumnsType<Ward> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_: unknown, __: Ward, index: number) =>
        ((searchParams.page ?? 1) - 1) * (searchParams.pageSize ?? 10) + index + 1,
    },
    {
      title: 'Mã Xã / Phường',
      dataIndex: 'wardCode',
      key: 'wardCode',
      width: 150,
      render: (val: string) => <Tag color="green">{val}</Tag>,
    },
    {
      title: 'Tên Xã / Phường',
      dataIndex: 'wardName',
      key: 'wardName',
    },
    {
      title: 'Tỉnh / Thành phố',
      dataIndex: 'provinceName',
      key: 'provinceName',
      width: 200,
      render: (val: string) => val || '—',
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: 100,
      render: (_: unknown, record: Ward) => (
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
              description={`Bạn có chắc muốn xóa "${record.wardName}"?`}
              onConfirm={() => handleDelete(record.wardCode)}
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
      {/* Search */}
      <div className={styles['search-section']}>
        <div className={styles['search-section__title']}>
          <SearchOutlined /> Tìm kiếm Xã / Phường
        </div>
        <Form form={searchForm} layout="inline" onFinish={handleSearch}>
          <Row gutter={[12, 12]} style={{ width: '100%' }}>
            <Col xs={24} sm={12} md={6} lg={5}>
              <Form.Item name="wardCode" label="Mã Xã / Phường">
                <Input placeholder="Nhập mã xã/phường" maxLength={25} allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="wardName" label="Tên Xã / Phường">
                <Input placeholder="Nhập tên xã/phường" maxLength={250} allowClear />
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
            Danh sách Xã / Phường
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
          rowKey="wardCode"
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
        title="Import danh sách Xã / Phường"
        open={importModal}
        onOk={handleImport}
        onCancel={() => {
          setImportModal(false);
          setFileList([]);
          importForm.resetFields();
        }}
        okText="Import"
        cancelText="Hủy"
        confirmLoading={importing}
      >
        <Form form={importForm} layout="vertical">
          <Form.Item
            name="provinceCode"
            label="Tỉnh / Thành phố"
            rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành phố' }]}
          >
            <Select
              placeholder="Chọn tỉnh/TP áp dụng cho dữ liệu import"
              showSearch
              optionFilterProp="label"
              options={provinceOptions}
            />
          </Form.Item>
        </Form>
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
        title="Cập nhật Xã / Phường"
        open={editModal}
        onOk={handleSave}
        onCancel={() => setEditModal(false)}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={saving}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="wardCode" label="Mã Xã / Phường">
            <Input maxLength={6} disabled />
          </Form.Item>
          <Form.Item
            name="wardName"
            label="Tên Xã / Phường"
            rules={[
              { max: 250, message: 'Tối đa 250 ký tự' },
              { pattern: /^\S/, message: 'Không được có ký tự trắng đầu tiên' },
            ]}
          >
            <Input maxLength={250} placeholder="Hỗ trợ tiếng Việt có dấu" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WardPage;
