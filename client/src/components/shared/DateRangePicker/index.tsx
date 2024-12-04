import { FC, useState, useRef, useEffect, memo } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css
import { IoCalendarOutline } from "react-icons/io5";
import COLORS from "../../../utils/enums/colors";

const DateRangePicker: FC<DateRangePickerProps> = ({
  onChange,
  initialStartDate = new Date(),
  initialEndDate = addDays(new Date(), 7),
  minDate,
  maxDate,
}) => {
  const [range, setRange] = useState<Range>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    key: "selection",
  });

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { TERTIARY } = COLORS;

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    const updatedRange: Range = {
      startDate: selection.startDate || new Date(),
      endDate: selection.endDate || new Date(),
      key: selection.key,
    };

    setRange(updatedRange);
    onChange({
      startDate: updatedRange.startDate!,
      endDate: updatedRange.endDate!,
    });
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const formatDateRange = () => {
    if (!range.startDate || !range.endDate) return "";
    return `${format(range.startDate, "dd MMM yy")} - ${format(
      range.endDate,
      "dd MMM yy"
    )}`;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="flex items-center gap-4 px-4 py-2 rounded-lg shadow-sm"
        onClick={handleToggle}
      >
        <IoCalendarOutline className="text-xl" />
        <span className="text-sm">{formatDateRange()}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-2 rounded-lg">
          <DateRange
            ranges={[range]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            minDate={minDate}
            maxDate={maxDate}
            rangeColors={[TERTIARY]}
          />
        </div>
      )}
    </div>
  );
};

export default memo(DateRangePicker);
