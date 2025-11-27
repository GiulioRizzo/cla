import { httpClient, withPagination } from './httpClient';
import {
  leadSchema,
  opportunitySchema,
  contactSchema,
  taskSchema,
  meetingSchema,
  Lead,
  Opportunity,
  Contact,
  Task,
  Meeting,
  PaginatedResponse,
} from '../models/entities';
import { authStorage, AuthCredentials } from '../storage/authStorage';

const parseList = <T>(schema: { array: () => { parse: (input: unknown) => T[] } }, data: any) => {
  return schema.array().parse(data.list ?? []);
};

export const espoApi = {
  async login(credentials: AuthCredentials) {
    const response = await httpClient.post('/oauth/token', credentials);
    const token = (response.data as { access_token: string }).access_token;
    await authStorage.saveToken(token);
    await authStorage.saveCredentials(credentials);
    return token;
  },
  async logout() {
    await authStorage.clearToken();
    await authStorage.clearCredentials();
  },
  async listLeads(params?: { offset?: number; maxSize?: number }): Promise<PaginatedResponse<Lead>> {
    const response = await httpClient.get('/Lead', withPagination({ params: {} }, params));
    return {
      list: parseList<Lead>(leadSchema, response.data),
      total: response.data.total || 0,
      offset: response.data.offset || 0,
      maxSize: response.data.maxSize || 0,
    };
  },
  async getLead(id: string): Promise<Lead> {
    const response = await httpClient.get(`/Lead/${id}`);
    return leadSchema.parse(response.data);
  },
  async createLead(payload: Partial<Lead>): Promise<Lead> {
    const response = await httpClient.post('/Lead', payload);
    return leadSchema.parse(response.data);
  },
  async updateLead(id: string, payload: Partial<Lead>): Promise<Lead> {
    const response = await httpClient.put(`/Lead/${id}`, payload);
    return leadSchema.parse(response.data);
  },
  async listOpportunities(params?: { offset?: number; maxSize?: number }): Promise<PaginatedResponse<Opportunity>> {
    const response = await httpClient.get('/Opportunity', withPagination({ params: {} }, params));
    return {
      list: parseList<Opportunity>(opportunitySchema, response.data),
      total: response.data.total || 0,
      offset: response.data.offset || 0,
      maxSize: response.data.maxSize || 0,
    };
  },
  async getOpportunity(id: string): Promise<Opportunity> {
    const response = await httpClient.get(`/Opportunity/${id}`);
    return opportunitySchema.parse(response.data);
  },
  async createOpportunity(payload: Partial<Opportunity>): Promise<Opportunity> {
    const response = await httpClient.post('/Opportunity', payload);
    return opportunitySchema.parse(response.data);
  },
  async updateOpportunity(id: string, payload: Partial<Opportunity>): Promise<Opportunity> {
    const response = await httpClient.put(`/Opportunity/${id}`, payload);
    return opportunitySchema.parse(response.data);
  },
  async listContacts(params?: { offset?: number; maxSize?: number }): Promise<PaginatedResponse<Contact>> {
    const response = await httpClient.get('/Contact', withPagination({ params: {} }, params));
    return {
      list: parseList<Contact>(contactSchema, response.data),
      total: response.data.total || 0,
      offset: response.data.offset || 0,
      maxSize: response.data.maxSize || 0,
    };
  },
  async getContact(id: string): Promise<Contact> {
    const response = await httpClient.get(`/Contact/${id}`);
    return contactSchema.parse(response.data);
  },
  async createContact(payload: Partial<Contact>): Promise<Contact> {
    const response = await httpClient.post('/Contact', payload);
    return contactSchema.parse(response.data);
  },
  async updateContact(id: string, payload: Partial<Contact>): Promise<Contact> {
    const response = await httpClient.put(`/Contact/${id}`, payload);
    return contactSchema.parse(response.data);
  },
  async listTasks(params?: { offset?: number; maxSize?: number }): Promise<PaginatedResponse<Task>> {
    const response = await httpClient.get('/Task', withPagination({ params: {} }, params));
    return {
      list: parseList<Task>(taskSchema, response.data),
      total: response.data.total || 0,
      offset: response.data.offset || 0,
      maxSize: response.data.maxSize || 0,
    };
  },
  async getTask(id: string): Promise<Task> {
    const response = await httpClient.get(`/Task/${id}`);
    return taskSchema.parse(response.data);
  },
  async createTask(payload: Partial<Task>): Promise<Task> {
    const response = await httpClient.post('/Task', payload);
    return taskSchema.parse(response.data);
  },
  async updateTask(id: string, payload: Partial<Task>): Promise<Task> {
    const response = await httpClient.put(`/Task/${id}`, payload);
    return taskSchema.parse(response.data);
  },
  async listMeetings(params?: { offset?: number; maxSize?: number }): Promise<PaginatedResponse<Meeting>> {
    const response = await httpClient.get('/Meeting', withPagination({ params: {} }, params));
    return {
      list: parseList<Meeting>(meetingSchema, response.data),
      total: response.data.total || 0,
      offset: response.data.offset || 0,
      maxSize: response.data.maxSize || 0,
    };
  },
  async getMeeting(id: string): Promise<Meeting> {
    const response = await httpClient.get(`/Meeting/${id}`);
    return meetingSchema.parse(response.data);
  },
  async createMeeting(payload: Partial<Meeting>): Promise<Meeting> {
    const response = await httpClient.post('/Meeting', payload);
    return meetingSchema.parse(response.data);
  },
  async updateMeeting(id: string, payload: Partial<Meeting>): Promise<Meeting> {
    const response = await httpClient.put(`/Meeting/${id}`, payload);
    return meetingSchema.parse(response.data);
  },
};
