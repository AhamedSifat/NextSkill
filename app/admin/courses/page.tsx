import { SectionCards } from '@/components/sidebar/section-cards';
import { ChartAreaInteractive } from '@/components/sidebar/chart-area-interactive';
import { DataTable } from '@/components/sidebar/data-table';
import data from '../data.json';
const page = () => {
  return (
    <>
      <SectionCards />
      <div className='px-4 lg:px-6'>
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
};

export default page;
