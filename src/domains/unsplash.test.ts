import { UnsplashApi, UnsplashSearchFilter } from './unsplash';
import { createApi } from 'unsplash-js';

jest.mock('unsplash-js', () => {
    return {
      createApi: jest.fn(() => ({
        search: {
          getPhotos: jest.fn(), 
          getCollections: jest.fn(),
          getUsers: jest.fn(),
        },
      })),
    };
  });

const mockCreateApi = createApi as jest.MockedFunction<typeof createApi>;
const mockGetPhotos = mockCreateApi({
    accessKey: 'test',
  }).search.getPhotos as jest.MockedFunction<any>;

describe('UnsplashApi', () => {
  let unsplashApi: UnsplashApi;

  beforeEach(() => {
    unsplashApi = new UnsplashApi();
    jest.clearAllMocks();
  });

  it('should return an empty array if query is empty', async () => {
    const filter: UnsplashSearchFilter = { query: '', page: 1, orderBy: 'relevant', color: undefined };
    const results = await unsplashApi.search(filter);
    expect(results).toEqual([]);
  });

  it('should fetch and parse data correctly from Unsplash API', async () => {
    const filter: UnsplashSearchFilter = { query: 'test', page: 1, orderBy: 'relevant', color: undefined };

    // Mock the API response
    const mockApiResponse = {
      response: {
        results: [
          {
            id: '1',
            color: 'red',
            width: 500,
            height: 500,
            description: 'Test image',
            urls: {
              regular: 'http://example.com/regular.jpg',
              thumb: 'http://example.com/thumb.jpg',
              small: 'http://example.com/small.jpg',
            },
          },
        ],
        total: 1,
        total_pages: 1,
      },
    };
    mockGetPhotos.mockResolvedValueOnce(mockApiResponse);

    const results = await unsplashApi.search(filter);
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      id: '1',
      color: 'red',
      width: 500,
      height: 500,
      description: 'Test image',
      urls: {
        regular: 'http://example.com/regular.jpg',
        thumb: 'http://example.com/thumb.jpg',
        small: 'http://example.com/small.jpg',
      },
    });

    // Ensure the API was called with the correct parameters
    expect(mockGetPhotos).toHaveBeenCalledWith({
      query: 'test',
      page: 1,
      perPage: 8,
      orderBy: 'relevant',
      color: undefined,
    });

    // Ensure totalPages is set correctly
    expect(unsplashApi.getTotalNumber()).toBe(1);
  });

});
