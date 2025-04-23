import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterDropdownProps {
  category: string
  setCategory: (category: string) => void
}

const FilterDropdown = ({ category, setCategory }: FilterDropdownProps) => {
  const categories = [
    "All",
    "Leafy Greens",
    "Root Vegetables",
    "Cruciferous",
    "Allium",
    "Nightshades",
    "Gourds"
  ]

  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat.toLowerCase()}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterDropdown