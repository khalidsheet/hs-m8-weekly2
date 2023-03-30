"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Modal, Row, message } from "antd";
import { useEffect, useState } from "react";
import client from "../client";
import { ADD_LIST, GET_LISTS } from "../queries/lists";
import { email } from "../constants";
import Link from "next/link";

export const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: GET_LISTS,
        variables: { email },
      });

      setLists(data.getMovieLists);
    })();
  }, [loading]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async ({ name }: { name: string }) => {
    setLoading(true);

    try {
      const { data } = await client.mutate({
        mutation: ADD_LIST,
        variables: {
          input: {
            name,
            email,
          },
        },
      });
      setLoading(false);
      setIsModalOpen(false);
      form.resetFields();
      messageApi.success("List created successfully");
    } catch (error) {
      if (error) {
        setLoading(false);
        form.setFields([{ name: "name", errors: ["Failed to create list"] }]);
      }
    }
  };

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      {contextHolder}
      <Row gutter={[24, 24]}>
        <Col span={4}>
          <Card className="add-list" onClick={showModal}>
            <span>
              <PlusOutlined style={{ fontSize: 32 }} />
            </span>
          </Card>
          <Modal
            title="Create a new list"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="List Name"
                name="name"
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter a list name",
                  },
                  {
                    max: 10,
                    message: "List name must be less than 10 characters",
                  },
                ]}
              >
                <Input placeholder="Enter a list name" />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
        {lists.map((list) => (
          <Col key={list.id} span={4}>
            <Link href={`/my-lists/${list.id}`}>
              <Card
                title={`#${list.id} ${list.name}`}
                style={{ height: "150px", cursor: "pointer" }}
              >
                {new Intl.DateTimeFormat("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(list.created_at))}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};
