"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/app/components/ui/switch";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { getIcon } from "@/app/lib/utils";
import { Check, Info, X } from "lucide-react";
import { Module, ConfigOption, ConfigOptionType, ModuleConfig } from "@/app/types";

interface ModuleConfigProps {
  module: Module;
  initialConfig?: ModuleConfig;
  onSave: (config: ModuleConfig) => void;
  onCancel: () => void;
}

export function ModuleConfig({ module, initialConfig, onSave, onCancel }: ModuleConfigProps) {
  const [enabled, setEnabled] = useState(initialConfig?.enabled ?? module.defaultEnabled);
  const [settings, setSettings] = useState<Record<string, string | boolean | number | string[]>>(
    initialConfig?.settings || {}
  );

  // Initialize with default values if not already set
  useEffect(() => {
    const defaults: Record<string, string | boolean | number | string[]> = {};
    let hasChanges = false;

    module.configOptions.forEach((option) => {
      if (
        option.defaultValue !== undefined && 
        settings[option.id] === undefined
      ) {
        defaults[option.id] = option.defaultValue;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setSettings((prev) => ({ ...prev, ...defaults }));
    }
  }, [module.configOptions, settings]);

  const handleSave = () => {
    onSave({
      moduleId: module.id,
      enabled,
      settings
    });
  };

  const updateSetting = (optionId: string, value: string | boolean | number | string[]) => {
    setSettings((prev) => ({
      ...prev,
      [optionId]: value
    }));
  };

  const renderConfigOption = (option: ConfigOption) => {
    const { id, name, description, type, required, defaultValue, options } = option;
    const value = settings[id] !== undefined ? settings[id] : defaultValue;

    switch (type) {
      case ConfigOptionType.Toggle:
        return (
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor={id}>{name}</Label>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <Switch
              id={id}
              checked={Boolean(value)}
              onCheckedChange={(checked) => updateSetting(id, checked)}
              disabled={!enabled}
            />
          </div>
        );
      case ConfigOptionType.Text:
        return (
          <div>
            <Label htmlFor={id}>
              {name}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <p className="text-sm text-gray-500 mb-2">{description}</p>
            <Input
              id={id}
              value={value as string || ""}
              onChange={(e) => updateSetting(id, e.target.value)}
              disabled={!enabled}
              required={required}
            />
          </div>
        );
      case ConfigOptionType.Select:
        return (
          <div>
            <Label htmlFor={id}>
              {name}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <p className="text-sm text-gray-500 mb-2">{description}</p>
            <Select
              id={id}
              value={value as string}
              onChange={(e) => updateSetting(id, e.target.value)}
              disabled={!enabled}
            >
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        );
      case ConfigOptionType.MultiSelect:
        const selectedValues = (value as string[]) || [];
        return (
          <div>
            <Label htmlFor={id}>
              {name}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <p className="text-sm text-gray-500 mb-2">{description}</p>
            <div className="border rounded-md p-3 bg-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => (
                    <Badge key={val} variant="secondary" className="flex items-center gap-1">
                      {val}
                      <button
                        onClick={() => 
                          updateSetting(
                            id, 
                            selectedValues.filter((v) => v !== val)
                          )
                        }
                        disabled={!enabled}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">No items selected</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {options?.map((option) => {
                  const isSelected = selectedValues.includes(option as string);
                  return (
                    <Badge
                      key={option}
                      variant={isSelected ? "success" : "outline"}
                      className={`cursor-pointer ${!enabled && "opacity-50 cursor-not-allowed"}`}
                      onClick={() => {
                        if (!enabled) return;
                        updateSetting(
                          id,
                          isSelected
                            ? selectedValues.filter((v) => v !== option)
                            : [...selectedValues, option]
                        );
                      }}
                    >
                      {isSelected && <Check size={14} className="mr-1" />}
                      {option}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case ConfigOptionType.Number:
        return (
          <div>
            <Label htmlFor={id}>
              {name}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <p className="text-sm text-gray-500 mb-2">{description}</p>
            <Input
              id={id}
              type="number"
              value={value as number || 0}
              onChange={(e) => updateSetting(id, Number(e.target.value))}
              disabled={!enabled}
              required={required}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  const ModuleIcon = getIcon(module.icon);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <ModuleIcon className="h-6 w-6 text-blue-700" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-gray-900">{module.name}</h3>
              <div className="flex gap-2">
                {module.isRequired && (
                  <Badge variant="info" className="flex items-center gap-1">
                    <Info size={14} />
                    Required
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-1">{module.description}</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <Label htmlFor={`enable-${module.id}`} className="font-medium">
            {module.isRequired ? "This feature will be included" : "Would you like this feature?"}
          </Label>
          <Switch
            id={`enable-${module.id}`}
            checked={enabled}
            onCheckedChange={setEnabled}
            disabled={module.isRequired}
          />
        </div>

        <div className="space-y-6">
          {module.configOptions.map((option) => (
            <div key={option.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              {renderConfigOption(option)}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Preferences
        </Button>
      </div>
    </div>
  );
} 