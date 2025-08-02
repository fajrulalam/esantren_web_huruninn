import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Santri } from '@/types/santri';

interface SantriSelectionProps {
  kodeAsrama: string;
  selectedSantriIds: Set<string>;
  onSelectionChange: (selectedIds: Set<string>) => void;
  excludeIds?: string[];
  title?: string;
  description?: string;
}

export default function SantriSelection({
  kodeAsrama,
  selectedSantriIds,
  onSelectionChange,
  excludeIds = [],
  title = "Pilih Santri",
  description
}: SantriSelectionProps) {
  const [santris, setSantris] = useState<Santri[]>([]);
  const [filteredSantris, setFilteredSantris] = useState<Santri[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isLoadingSantris, setIsLoadingSantris] = useState(false);
  const [filters, setFilters] = useState({
    statusAktif: 'Aktif',
    kamar: '',
    jenjangPendidikan: '',
    semester: '',
  });

  // Fetch santris
  const fetchSantris = async () => {
    setIsLoadingSantris(true);
    try {
      const santriRef = collection(db, "SantriCollection");
      const q = query(
        santriRef, 
        where("kodeAsrama", "==", kodeAsrama)
      );
      const querySnapshot = await getDocs(q);
      
      const santriData = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          nama: doc.data().nama || '',
          kamar: doc.data().kamar || '',
          jenjangPendidikan: doc.data().jenjangPendidikan || '',
          statusAktif: doc.data().statusAktif || '',
          tahunMasuk: doc.data().tahunMasuk || '',
          programStudi: doc.data().programStudi || '',
          semester: doc.data().kelas || '',
          kodeAsrama: doc.data().kodeAsrama
        }))
        .filter(santri => !excludeIds.includes(santri.id));
      
      setSantris(santriData);
      applyFilters(santriData, filters);
    } catch (error) {
      console.error("Error fetching santri data:", error);
    } finally {
      setIsLoadingSantris(false);
    }
  };

  // Apply filters
  const applyFilters = (data: Santri[], currentFilters: typeof filters) => {
    let filtered = [...data];
    
    if (currentFilters.statusAktif) {
      filtered = filtered.filter(santri => santri.statusAktif === currentFilters.statusAktif);
    }
    
    if (currentFilters.kamar) {
      filtered = filtered.filter(santri => santri.kamar === currentFilters.kamar);
    }
    
    if (currentFilters.jenjangPendidikan) {
      filtered = filtered.filter(santri => santri.jenjangPendidikan === currentFilters.jenjangPendidikan);
    }

    if (currentFilters.semester) {
      filtered = filtered.filter(santri => santri.semester === currentFilters.semester);
    }
    
    setFilteredSantris(filtered);
    setIsSelectAll(false);
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(santris, newFilters);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (isSelectAll) {
      onSelectionChange(new Set());
    } else {
      const newSelectedIds = new Set<string>();
      filteredSantris.forEach(santri => newSelectedIds.add(santri.id));
      onSelectionChange(newSelectedIds);
    }
    setIsSelectAll(!isSelectAll);
  };

  // Handle individual selection
  const handleSelectSantri = (santriId: string) => {
    const newSelectedIds = new Set(selectedSantriIds);
    if (newSelectedIds.has(santriId)) {
      newSelectedIds.delete(santriId);
    } else {
      newSelectedIds.add(santriId);
    }
    onSelectionChange(newSelectedIds);
    setIsSelectAll(newSelectedIds.size === filteredSantris.length && filteredSantris.length > 0);
  };

  // Load santris on mount
  useEffect(() => {
    fetchSantris();
  }, [kodeAsrama]);

  // Update select all state when selections change
  useEffect(() => {
    setIsSelectAll(selectedSantriIds.size === filteredSantris.length && filteredSantris.length > 0);
  }, [selectedSantriIds, filteredSantris]);

  return (
    <div className="santri-selection">
      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{title}</h4>
      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      )}
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label htmlFor="statusAktif" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Status Aktif
          </label>
          <select
            id="statusAktif"
            name="statusAktif"
            value={filters.statusAktif}
            onChange={handleFilterChange}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
          >
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Boyong">Boyong</option>
            <option value="Lulus">Lulus</option>
          </select>
        </div>

        <div>
          <label htmlFor="jenjangPendidikan" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Jenjang Pendidikan
          </label>
          <select
            id="jenjangPendidikan"
            name="jenjangPendidikan"
            value={filters.jenjangPendidikan}
            onChange={handleFilterChange}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
          >
            <option value="">Semua Jenjang</option>
            {[...new Set(santris.map(s => s.jenjangPendidikan))].filter(Boolean).sort().map(jenjang => (
              <option key={jenjang} value={jenjang}>{jenjang}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="kamar" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Kamar
          </label>
          <select
            id="kamar"
            name="kamar"
            value={filters.kamar}
            onChange={handleFilterChange}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
          >
            <option value="">Semua Kamar</option>
            {[...new Set(santris.map(s => s.kamar))].filter(Boolean).sort().map(kamar => (
              <option key={kamar} value={kamar}>{kamar}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="semester" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Semester/Kelas
          </label>
          <select
            id="semester"
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
          >
            <option value="">Semua Semester/Kelas</option>
            {[...new Set(santris.map(s => s.semester))].filter(Boolean).sort().map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Santri list */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            checked={isSelectAll}
            onChange={handleSelectAll}
          />
          <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            {isSelectAll 
              ? `Semua Terpilih (${filteredSantris.length})`
              : selectedSantriIds.size > 0
                ? `${selectedSantriIds.size} Terpilih dari ${filteredSantris.length}`
                : `Pilih Semua (${filteredSantris.length})`
            }
          </span>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {isLoadingSantris ? (
            <div className="flex flex-col justify-center items-center py-8 space-y-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Memuat data santri...
              </span>
            </div>
          ) : filteredSantris.length === 0 ? (
            <div className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Tidak ada santri yang sesuai dengan filter
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-2 py-2 sticky left-0 bg-gray-50 dark:bg-gray-800 z-10"></th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-8 bg-gray-50 dark:bg-gray-800 z-10">
                      Nama
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Kamar
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Jenjang Pendidikan
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Semester/Kelas
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Program Studi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSantris.map((santri) => (
                    <tr 
                      key={santri.id}
                      className={selectedSantriIds.has(santri.id) 
                        ? "bg-blue-50 dark:bg-blue-900/30" 
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"}
                    >
                      <td className={`px-2 py-2 whitespace-nowrap sticky left-0 z-10 ${
                        selectedSantriIds.has(santri.id) 
                          ? "bg-blue-50 dark:bg-blue-900/30" 
                          : "bg-white dark:bg-gray-900"
                      }`}>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                          checked={selectedSantriIds.has(santri.id)}
                          onChange={() => handleSelectSantri(santri.id)}
                        />
                      </td>
                      <td className={`px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white sticky left-8 z-10 ${
                        selectedSantriIds.has(santri.id) 
                          ? "bg-blue-50 dark:bg-blue-900/30" 
                          : "bg-white dark:bg-gray-900"
                      }`}>
                        {santri.nama}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${santri.statusAktif === 'Aktif' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' : 
                          santri.statusAktif === 'Boyong' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400' : 
                          santri.statusAktif === 'Lulus' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          {santri.statusAktif}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {santri.kamar || "-"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {santri.jenjangPendidikan || "-"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {santri.semester || "-"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {santri.programStudi || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {selectedSantriIds.size === 0 
          ? 'Jika tidak ada santri dipilih, presensi akan menampilkan semua santri Aktif'
          : `${selectedSantriIds.size} santri akan ditampilkan di presensi ini`
        }
      </div>
    </div>
  );
}