import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Building,
  Shield,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit,
  Save,
  FileText
} from "lucide-react";
import { useState } from "react";

export const ProfileKYC = () => {
  const [editMode, setEditMode] = useState(false);

  const companyProfile = {
    companyName: "TechFlow Solutions Ltd",
    registrationNumber: "12345678",
    industry: "Software Development",
    taxId: "TAX-987654321",
    incorporationDate: "2020-03-15",
    address: "123 Business District, Tech City, TC 12345",
    website: "https://techflow-solutions.com",
    description: "Leading provider of digital transformation solutions for SMEs"
  };

  const kycStatus = {
    overall: "verified",
    documents: [
      {
        name: "Certificate of Incorporation",
        status: "verified",
        uploadDate: "2024-01-15",
        expiryDate: null
      },
      {
        name: "Tax Registration Certificate",
        status: "verified", 
        uploadDate: "2024-01-15",
        expiryDate: "2025-01-15"
      },
      {
        name: "Bank Statement",
        status: "pending",
        uploadDate: "2024-01-18",
        expiryDate: null
      },
      {
        name: "Director ID Verification",
        status: "verified",
        uploadDate: "2024-01-15",
        expiryDate: "2026-01-15"
      },
      {
        name: "Business License",
        status: "rejected",
        uploadDate: "2024-01-10",
        expiryDate: "2025-01-10",
        rejectReason: "Document quality insufficient"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "success";
      case "pending": return "warning";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return CheckCircle;
      case "pending": return Clock;
      case "rejected": return AlertCircle;
      default: return FileText;
    }
  };

  const verifiedDocs = kycStatus.documents.filter(doc => doc.status === "verified").length;
  const totalDocs = kycStatus.documents.length;
  const completionRate = Math.round((verifiedDocs / totalDocs) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile & KYC Verification</h1>
          <p className="text-muted-foreground">Manage your business profile and verification status</p>
        </div>
        <Button 
          variant={editMode ? "success" : "outline"}
          onClick={() => setEditMode(!editMode)}
          className="gap-2"
        >
          {editMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          {editMode ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      {/* KYC Status Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verification Status
            </CardTitle>
            <Badge variant={getStatusColor(kycStatus.overall) as any} className="gap-1">
              <CheckCircle className="h-3 w-3" />
              {kycStatus.overall === "verified" ? "Verified Business" : "Pending Verification"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{completionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{verifiedDocs}</div>
              <div className="text-sm text-muted-foreground">Verified Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">
                {kycStatus.documents.filter(doc => doc.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Profile */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyProfile.companyName}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    value={companyProfile.registrationNumber}
                    disabled={!editMode}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    value={companyProfile.taxId}
                    disabled={!editMode}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={companyProfile.industry}
                    disabled={!editMode}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="incDate">Incorporation Date</Label>
                  <Input
                    id="incDate"
                    type="date"
                    value={companyProfile.incorporationDate}
                    disabled={!editMode}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={companyProfile.address}
                  disabled={!editMode}
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyProfile.website}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={companyProfile.description}
                  disabled={!editMode}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Verification */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {kycStatus.documents.map((doc, index) => {
              const StatusIcon = getStatusIcon(doc.status);
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      doc.status === "verified" ? "bg-success/10" :
                      doc.status === "pending" ? "bg-warning/10" :
                      "bg-destructive/10"
                    }`}>
                      <StatusIcon className={`h-4 w-4 ${
                        doc.status === "verified" ? "text-success" :
                        doc.status === "pending" ? "text-warning" :
                        "text-destructive"
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Uploaded: {doc.uploadDate}
                        {doc.expiryDate && (
                          <span> • Expires: {doc.expiryDate}</span>
                        )}
                      </div>
                      {doc.rejectReason && (
                        <div className="text-sm text-destructive mt-1">
                          Reason: {doc.rejectReason}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(doc.status) as any}>
                      {doc.status}
                    </Badge>
                    {doc.status === "rejected" && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-3 w-3" />
                        Re-upload
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Upload New Document */}
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
              <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground mb-1">Upload Additional Documents</div>
              <div className="text-xs text-muted-foreground mb-3">
                PDF, PNG, JPG up to 10MB
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Upload className="h-3 w-3" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Authorized Representative
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value="John Smith"
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value="Chief Executive Officer"
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value="john.smith@techflow-solutions.com"
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value="+1 (555) 123-4567"
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value="United States"
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  value="••••••••••••7890"
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};