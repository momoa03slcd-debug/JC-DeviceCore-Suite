import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import {
  AlertCircle,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

/**
 * DeviceImageUpload Komponente - Bildupload UI für Geräte
 * Features:
 * - Drag & Drop Upload
 * - Mehrere Dateien auswählen
 * - Dateivalidierung (Größe, Typ)
 * - Fortschrittsanzeige (simuliert)
 * - Bildvorschau
 * - Fehlerbehandlung
 * - data-testid für umfassende Tests
 */
const DeviceImageUpload = ({ isOpen, onOpenChange, onUpload, deviceId = null }) => {
  const { t } = useLanguage();
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Datei-Validierungskonfiguration
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

  const validateFile = (file) => {
    const errors_list = [];

    // Größenprüfung
    if (file.size > MAX_FILE_SIZE) {
      errors_list.push(`${file.name}: File size exceeds 5MB limit`);
    }

    // Typprüfung
    if (!ALLOWED_TYPES.includes(file.type)) {
      errors_list.push(
        `${file.name}: File type not supported. Only JPEG, PNG, and WebP are allowed.`
      );
    }

    return errors_list;
  };

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newErrors = [];

    fileArray.forEach((file) => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push(...fileErrors);
      } else {
        // Datei akzeptiert
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(7),
              name: file.name,
              size: file.size,
              type: file.type,
              preview: e.target.result,
              status: 'ready',
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });

    setErrors(newErrors);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const simulateUpload = () => {
    // Simuliere den Upload-Prozess
    uploadedFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: 'completed' } : f
            )
          );
        }
        setUploadProgress((prev) => ({
          ...prev,
          [file.id]: Math.min(progress, 100),
        }));
      }, 300);
    });
  };

  const handleUpload = () => {
    if (uploadedFiles.length === 0) {
      setErrors(['Please select at least one image']);
      return;
    }

    simulateUpload();

    // Nach 3 Sekunden aufräumen
    setTimeout(() => {
      if (onUpload) {
        onUpload(uploadedFiles);
      }
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setFiles([]);
    setUploadedFiles([]);
    setUploadProgress({});
    setErrors([]);
    onOpenChange(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes, k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="device-upload-dialog"
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle data-testid="device-upload-title">
            Upload Device Images
          </DialogTitle>
          <DialogDescription>
            {deviceId ? `Upload images for device #${deviceId}` : 'Upload one or more device images'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert data-testid="device-upload-errors" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="mt-2 space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx} data-testid={`device-upload-error-${idx}`}>
                      {error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Drag & Drop Area */}
          {uploadedFiles.length === 0 ? (
            <div
              data-testid="device-upload-dropzone"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Upload
                data-testid="device-upload-icon"
                className="w-12 h-12 mx-auto mb-4 text-muted-foreground"
              />
              <h3
                data-testid="device-upload-prompt-title"
                className="font-semibold text-foreground mb-2"
              >
                Drag and drop images here
              </h3>
              <p data-testid="device-upload-prompt-desc" className="text-sm text-muted-foreground mb-4">
                or click below to select files
              </p>

              <div className="space-y-2">
                <Label
                  htmlFor="file-input"
                  asChild
                  data-testid="device-upload-file-label"
                >
                  <Button
                    data-testid="device-upload-select-btn"
                    variant="outline"
                  >
                    Select Images
                  </Button>
                </Label>
                <Input
                  data-testid="device-upload-file-input"
                  id="file-input"
                  type="file"
                  multiple
                  accept={ALLOWED_EXTENSIONS.join(',')}
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: JPEG, PNG, WebP (max 5MB each)
              </p>
            </div>
          ) : null}

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div data-testid="device-upload-files" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 data-testid="device-upload-files-title" className="font-semibold">
                  Selected Images ({uploadedFiles.length})
                </h3>
                {uploadedFiles.every((f) => f.status === 'ready') && (
                  <Button
                    data-testid="device-upload-add-more-btn"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById('file-input-secondary');
                      if (input) input.click();
                    }}
                  >
                    Add More
                  </Button>
                )}
                <Input
                  id="file-input-secondary"
                  type="file"
                  multiple
                  accept={ALLOWED_EXTENSIONS.join(',')}
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>

              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <Card
                    key={file.id}
                    data-testid={`device-upload-file-card-${file.id}`}
                    className="border-border/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Image Preview */}
                        <div
                          data-testid={`device-upload-preview-${file.id}`}
                          className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0"
                        >
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p
                                data-testid={`device-upload-filename-${file.id}`}
                                className="font-medium text-sm truncate"
                              >
                                {file.name}
                              </p>
                              <p
                                data-testid={`device-upload-filesize-${file.id}`}
                                className="text-xs text-muted-foreground"
                              >
                                {formatFileSize(file.size)}
                              </p>
                            </div>

                            {/* Status */}
                            <div className="flex-shrink-0">
                              {file.status === 'ready' && (
                                <Badge
                                  data-testid={`device-upload-status-${file.id}`}
                                  variant="secondary"
                                >
                                  Ready
                                </Badge>
                              )}
                              {file.status === 'uploading' && (
                                <Badge
                                  data-testid={`device-upload-status-${file.id}`}
                                  variant="outline"
                                >
                                  Uploading...
                                </Badge>
                              )}
                              {file.status === 'completed' && (
                                <Badge
                                  data-testid={`device-upload-status-${file.id}`}
                                  variant="success"
                                  className="gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Done
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {(file.status === 'uploading' || uploadProgress[file.id]) && (
                            <div className="mt-3 space-y-1">
                              <Progress
                                data-testid={`device-upload-progress-${file.id}`}
                                value={uploadProgress[file.id] || 0}
                                className="h-2"
                              />
                              <p
                                data-testid={`device-upload-progress-text-${file.id}`}
                                className="text-xs text-muted-foreground"
                              >
                                {Math.round(uploadProgress[file.id] || 0)}%
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Remove Button */}
                        {file.status === 'ready' && (
                          <Button
                            data-testid={`device-upload-remove-${file.id}`}
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(file.id)}
                            className="flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <Alert data-testid="device-upload-info" variant="default">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Images are stored locally in browser cache. For production, connect to your backend storage
              service (AWS S3, Azure Blob, etc.).
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="gap-3">
          <Button
            data-testid="device-upload-close-btn"
            variant="outline"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            data-testid="device-upload-submit-btn"
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload {uploadedFiles.length} {uploadedFiles.length === 1 ? 'Image' : 'Images'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceImageUpload;
