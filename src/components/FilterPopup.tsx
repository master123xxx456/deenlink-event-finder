import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, MapPin, Calendar, Users, Tag, Clock, RefreshCw } from "lucide-react";

interface FilterState {
  searchQuery: string;
  category: string;
  ageGroup: string;
  distance: string;
  masjids: string[];
  dateRange: string;
  timeOfDay: string;
  source: string[];
}

interface FilterPopupProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const FilterPopup = ({ filters, onFiltersChange, onRefresh, isRefreshing }: FilterPopupProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["all", "Prayer", "Education", "Youth", "Family", "Community Service", "Kids", "Fundraiser", "Planning", "Sports", "Competition", "Arts"];
  const ageGroups = ["all", "Kids", "Teens", "Adults", "Family", "All Ages"];
  const distances = ["all", "Within 1 mile", "Within 5 miles", "Within 10 miles", "Within 25 miles"];
  const masjids = ["Islamic Center of Maryland (ICM)", "ADAMS Center", "Dar-us-Salaam", "MCC Chicago"];
  const dateRanges = ["all", "Today", "Tomorrow", "This Week", "Next Week", "This Month"];
  const timesOfDay = ["all", "Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)"];
  const sources = ["website", "instagram", "facebook"];

  const handleMasjidChange = (masjid: string, checked: boolean) => {
    const updatedMasjids = checked 
      ? [...localFilters.masjids, masjid]
      : localFilters.masjids.filter(m => m !== masjid);
    
    setLocalFilters({ ...localFilters, masjids: updatedMasjids });
  };

  const handleSourceChange = (source: string, checked: boolean) => {
    const updatedSources = checked 
      ? [...localFilters.source, source]
      : localFilters.source.filter(s => s !== source);
    
    setLocalFilters({ ...localFilters, source: updatedSources });
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
      searchQuery: "",
      category: "all",
      ageGroup: "all",
      distance: "all",
      masjids: [],
      dateRange: "all",
      timeOfDay: "all",
      source: []
    };
    setLocalFilters(resetState);
    onFiltersChange(resetState);
  };

  const getFilterCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.category !== "all") count++;
    if (filters.ageGroup !== "all") count++;
    if (filters.distance !== "all") count++;
    if (filters.masjids.length > 0) count++;
    if (filters.dateRange !== "all") count++;
    if (filters.timeOfDay !== "all") count++;
    if (filters.source.length > 0) count++;
    return count;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative bg-white/95 backdrop-blur border-white/20">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {getFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getFilterCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Events
          </SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect Islamic events near you
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Auto-refresh button */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Data Source
            </Label>
            <Button 
              onClick={onRefresh} 
              disabled={isRefreshing}
              variant="outline" 
              className="w-full"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scraping Latest Events...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh from Masjid Sources
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Updates automatically every 30 minutes from masjid websites and social media
            </p>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">Search</Label>
            <Input
              id="search"
              placeholder="Search events, masjids..."
              value={localFilters.searchQuery}
              onChange={(e) => setLocalFilters({ ...localFilters, searchQuery: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category
            </Label>
            <Select value={localFilters.category} onValueChange={(value) => setLocalFilters({ ...localFilters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Age Group */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Age Group
            </Label>
            <Select value={localFilters.ageGroup} onValueChange={(value) => setLocalFilters({ ...localFilters, ageGroup: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                {ageGroups.map(ageGroup => (
                  <SelectItem key={ageGroup} value={ageGroup}>
                    {ageGroup === "all" ? "All Age Groups" : ageGroup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Distance */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Distance
            </Label>
            <Select value={localFilters.distance} onValueChange={(value) => setLocalFilters({ ...localFilters, distance: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                {distances.map(distance => (
                  <SelectItem key={distance} value={distance}>
                    {distance === "all" ? "Any Distance" : distance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Label>
            <Select value={localFilters.dateRange} onValueChange={(value) => setLocalFilters({ ...localFilters, dateRange: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range} value={range}>
                    {range === "all" ? "Any Time" : range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time of Day */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time of Day
            </Label>
            <Select value={localFilters.timeOfDay} onValueChange={(value) => setLocalFilters({ ...localFilters, timeOfDay: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timesOfDay.map(time => (
                  <SelectItem key={time} value={time}>
                    {time === "all" ? "Any Time" : time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Masjids */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Masjids</Label>
            <div className="space-y-2">
              {masjids.map((masjid) => (
                <div key={masjid} className="flex items-center space-x-2">
                  <Checkbox
                    id={masjid}
                    checked={localFilters.masjids.includes(masjid)}
                    onCheckedChange={(checked) => handleMasjidChange(masjid, checked as boolean)}
                  />
                  <Label htmlFor={masjid} className="text-sm font-normal">
                    {masjid}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Data Sources</Label>
            <div className="space-y-2">
              {sources.map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={source}
                    checked={localFilters.source.includes(source)}
                    onCheckedChange={(checked) => handleSourceChange(source, checked as boolean)}
                  />
                  <Label htmlFor={source} className="text-sm font-normal capitalize">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Choose which sources to include in your search
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button onClick={resetFilters} variant="outline" className="w-full">
            Reset All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterPopup;
export type { FilterState };