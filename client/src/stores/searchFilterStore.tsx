import { create } from 'zustand';

type SortOrder = 'asc' | 'desc';

interface UsesSearchFilterStore {
  searchTerm: string;
  selectedCourseOfStudy: string;
  selectedCourse: string;
  selectedSortOrder: SortOrder;
  selectedFilterProperty: string;
  isSubmitting: boolean;
  currentPageIndex: number;
  setSelectedCourseOfStudy: (selectedCourseOfStudy: string) => void;
  setSelectedCourse: (course: string) => void;
  setSelectedFilterProperty: (filterProperty: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setCurrentPageIndex: (pageIndex: number) => void;
  setSelectedSortOrder: (sortOrder: SortOrder) => void;
  setSearchTerm: (searchTerm: string) => void;
  resetStore: () => void;
}

const initialState = {
  searchTerm: '',
  selectedCourseOfStudy: '',
  selectedCourse: '',
  selectedSortOrder: 'asc' as SortOrder,
  selectedFilterProperty: '',
  isSubmitting: false,
  currentPageIndex: 1
};

const usesSearchFilterStore = create<UsesSearchFilterStore>((set) => ({
  ...initialState,

  setSearchTerm: (searchTerm: string) => set({ searchTerm }),

  setSelectedCourseOfStudy: (selectedCourseOfStudy: string) => {
    set({ selectedCourseOfStudy });
  },

  setSelectedCourse: (selectedCourse: string) => set({ selectedCourse }),

  setSelectedSortOrder: (selectedSortOrder: SortOrder) => set({ selectedSortOrder }),

  setSelectedFilterProperty: (selectedFilterProperty: string) =>
    set({ selectedFilterProperty }),

  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),

  setCurrentPageIndex: (currentPageIndex: number) => set({ currentPageIndex }),

  resetStore: () => set(initialState)
}));

export { usesSearchFilterStore };
